#!/bin/sh
mkdir canopy-device-mgr-15.04.03
cp *.js *.txt *.html canopy-device-mgr-15.04.03
cp -r nodes canopy-device-mgr-15.04.03
cp -r images canopy-device-mgr-15.04.03
cp -r icons canopy-device-mgr-15.04.03
cp -r example-config canopy-device-mgr-15.04.03
cp -r 3rdpary canopy-device-mgr-15.04.03
tar -czvf canopy-device-mgr_15.04.03.src.tar.gz canopy-device-mgr-15.04.03
rm -r canopy-device-mgr-15.04.03
