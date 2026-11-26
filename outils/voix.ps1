# Graine de star : fabrique les fichiers son des consignes (voix française de Windows)
# Usage : powershell -ExecutionPolicy Bypass -File outils\voix.ps1 <racine du projet>
param([string]$root = ".")
Add-Type -AssemblyName System.Speech
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer
$s.SelectVoice("Microsoft Hortense Desktop")
$s.Rate = -1
$fmt = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(16000, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono)
$dir = Join-Path $root "voix"
if (-not (Test-Path $dir)) { New-Item -ItemType Directory $dir | Out-Null }
$cacheFile = Join-Path $root "outils\voix-cache.txt"
$cache = @{}
if (Test-Path $cacheFile) { Get-Content $cacheFile -Encoding UTF8 | ForEach-Object { $p = $_ -split "`t", 2; if ($p.Count -eq 2) { $cache[$p[0]] = $p[1] } } }
$n = 0
$lines = Get-Content (Join-Path $root "outils\phrases.txt") -Encoding UTF8
foreach ($line in $lines) {
  $p = $line -split "`t", 2
  if ($p.Count -ne 2) { continue }
  $id = $p[0]; $text = $p[1]; $out = Join-Path $dir ($id + ".wav")
  if ((Test-Path $out) -and $cache[$id] -eq $text) { continue }
  $s.SetOutputToWaveFile($out, $fmt)
  $s.Speak($text)
  $s.SetOutputToNull()
  $cache[$id] = $text; $n++
}
$cache.GetEnumerator() | Sort-Object Name | ForEach-Object { $_.Name + "`t" + $_.Value } | Set-Content $cacheFile -Encoding UTF8
"$n fichiers son créés"
