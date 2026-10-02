# India Watershed Prototype – Dataset Package

This package is prepared for SIH Problem Statement 26015.

## Official datasets to obtain

1. India watershed boundaries
   Source: Government of India OGD – Hydrological Boundaries
   https://www.data.gov.in/catalog/hydrological-boundaries
   Dataset: Shape of Watershed Boundaries of India
   Format: ZIP containing SHP/SHX/DBF/PRJ/etc.

2. Bhuvan/NRSC Open EO Data Archive
   https://bhuvan-app3.nrsc.gov.in/data/download/
   Useful downloadable products include:
   - CartoDEM 1 arc-second
   - Resourcesat AWiFS
   - Resourcesat LISS-III
   The portal supports bounding box, tiles, mapsheet and interactive drawing.

3. Bhuvan Thematic LULC
   https://bhuvan-app1.nrsc.gov.in/2dresources/bhuvanstore2.php
   LULC 1:250,000 is available for multiple years including 2022-23.
   LULC WMS:
   https://bhuvan-ras2.nrsc.gov.in/cgi-bin/LULC250K.exe

4. Bhuvan Thematic Services
   https://bhuvan-app1.nrsc.gov.in/thematic/thematic/usertasks/download1/tooldown1.php
   Includes LULC, land degradation, wasteland, geomorphology, lineament,
   erosion, water-bodies and other thematic products/services.

## Important
The Bhuvan Open Data Archive requires login for tile downloads and limits the
number of downloadable tiles per day. Therefore this package does not pretend
to contain the large raw India-wide raster archive.

## Recommended local structure

data/
  watershed_boundary/
  dem/
  satellite/
  lulc/
  waterbodies/
  geotagged_images/
  metadata/

## Prototype strategy

Use the India watershed boundary as the main vector dataset.
Use Bhuvan LULC/thematic services for national visualization.
Download only the DEM/satellite tiles needed for the selected watershed/AOI.
For DRISHTI-style field evidence, store geo-tagged images with:
image_name, latitude, longitude, date, category, description.

