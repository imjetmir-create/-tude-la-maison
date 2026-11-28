# Allemand : fabrique un fichier son (mp3) par mot ou phrase de outils\phrases-de.txt (voix allemande de Windows « Katja »)
# Usage : powershell -ExecutionPolicy Bypass -File outils\voix-de.ps1 <racine du projet> [limite]
# Étapes : 1) synthèse en .wav dans outils\voix-de-wav  2) python outils\voix_trim.py <racine> voix-de-wav  3) ce script avec -mp3
param([string]$root = ".", [int]$limit = 0, [switch]$mp3)
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$all = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq "AsTask" }
$opT = ($all | Where-Object { $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
$actP = ($all | Where-Object { $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncActionWithProgress`1' })[0]
function Await($op, [Type]$t) { $task = $opT.MakeGenericMethod($t).Invoke($null, @($op)); $task.Wait(-1) | Out-Null; $task.Result }
function AwaitP($op, [Type]$t) { $task = $actP.MakeGenericMethod($t).Invoke($null, @($op)); $task.Wait(-1) | Out-Null }

$root = (Resolve-Path $root).Path
$wavDir = Join-Path $root "outils\voix-de-wav"
$outDir = Join-Path $root "voix-de"
foreach ($d in @($wavDir, $outDir)) { if (-not (Test-Path $d)) { New-Item -ItemType Directory $d | Out-Null } }
$lines = Get-Content (Join-Path $root "outils\phrases-de.txt") -Encoding UTF8
$n = 0

if (-not $mp3) {
  [Windows.Media.SpeechSynthesis.SpeechSynthesizer, Windows.Media.SpeechSynthesis, ContentType = WindowsRuntime] | Out-Null
  $s = New-Object Windows.Media.SpeechSynthesis.SpeechSynthesizer
  $s.Voice = [Windows.Media.SpeechSynthesis.SpeechSynthesizer]::AllVoices | Where-Object { $_.DisplayName -like "*Katja*" } | Select-Object -First 1
  $s.Options.SpeakingRate = 0.85
  foreach ($line in $lines) {
    $p = $line -split "`t", 2
    if ($p.Count -ne 2) { continue }
    $out = Join-Path $wavDir ($p[0] + ".wav")
    if (Test-Path $out) { continue }
    $st = Await ($s.SynthesizeTextToStreamAsync($p[1])) ([Windows.Media.SpeechSynthesis.SpeechSynthesisStream])
    $in = [System.IO.WindowsRuntimeStreamExtensions]::AsStreamForRead($st)
    $fs = [System.IO.File]::Create($out); $in.CopyTo($fs); $fs.Close(); $in.Dispose(); $st.Dispose()
    $n++
    if ($limit -and $n -ge $limit) { break }
  }
  "$n fichiers wav créés"
} else {
  [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
  [Windows.Media.Transcoding.MediaTranscoder, Windows.Media.Transcoding, ContentType = WindowsRuntime] | Out-Null
  [Windows.Media.MediaProperties.MediaEncodingProfile, Windows.Media.MediaProperties, ContentType = WindowsRuntime] | Out-Null
  $tr = New-Object Windows.Media.Transcoding.MediaTranscoder
  $prof = [Windows.Media.MediaProperties.MediaEncodingProfile]::CreateMp3([Windows.Media.MediaProperties.AudioEncodingQuality]::Low)
  $prof.Audio.ChannelCount = 1; $prof.Audio.SampleRate = 16000; $prof.Audio.Bitrate = 32000
  $folder = Await ([Windows.Storage.StorageFolder]::GetFolderFromPathAsync($outDir)) ([Windows.Storage.StorageFolder])
  foreach ($line in $lines) {
    $p = $line -split "`t", 2
    if ($p.Count -ne 2) { continue }
    $wav = Join-Path $wavDir ($p[0] + ".wav")
    if (-not (Test-Path $wav) -or (Test-Path (Join-Path $outDir ($p[0] + ".mp3")))) { continue }
    $src = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($wav)) ([Windows.Storage.StorageFile])
    $dst = Await ($folder.CreateFileAsync($p[0] + ".mp3", [Windows.Storage.CreationCollisionOption]::ReplaceExisting)) ([Windows.Storage.StorageFile])
    $prep = Await ($tr.PrepareFileTranscodeAsync($src, $dst, $prof)) ([Windows.Media.Transcoding.PrepareTranscodeResult])
    if (-not $prep.CanTranscode) { "Impossible : " + $p[0] + " " + $prep.FailureReason; continue }
    AwaitP ($prep.TranscodeAsync()) ([double])
    $n++
    if ($limit -and $n -ge $limit) { break }
  }
  "$n fichiers mp3 créés"
}
