#!/bin/bash
if [[ -z $1 ]]; then
    echo 'Usage: ./create_src_pkg <VERSION>'
    exit
fi
mkdir canopy-device-mgr-$1
cp *.js *.txt *.html canopy-device-mgr-$1
cp -r nodes canopy-device-mgr-$1
cp -r www canopy-device-mgr-$1
cp -r images canopy-device-mgr-$1
cp -r icons canopy-device-mgr-$1
cp -r example-config canopy-device-mgr-$1
cp -r 3rdpary canopy-device-mgr-$1
tar -czvf canopy-device-mgr_${1}.src.tar.gz canopy-device-mgr-$1
rm -r canopy-device-mgr-$1
