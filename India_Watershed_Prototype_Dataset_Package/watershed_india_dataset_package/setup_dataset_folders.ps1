# Run from the dataset package folder.
# Creates the folders needed by the SIH prototype.

$folders = @(
  "data\watershed_boundary",
  "data\dem",
  "data\satellite",
  "data\lulc",
  "data\waterbodies",
  "data\geotagged_images",
  "data\metadata"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

Write-Host "Dataset folders created."
Write-Host "Download official watershed ZIP from:"
Write-Host "https://www.data.gov.in/catalog/hydrological-boundaries"
Write-Host "Download satellite/DEM tiles from:"
Write-Host "https://bhuvan-app3.nrsc.gov.in/data/download/"
