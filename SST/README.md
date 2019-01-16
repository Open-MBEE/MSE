* How to set up OpenMBEE SST environment

1) Install MapleMBSE

2) Copy OpenMBEE certificates to "certs" folder in MapleMBSE installation folder.
    copy cert.jks and cert.pass in https://github.com/Open-MBEE/open-mbee.github.io/tree/master/openmbee-public-server/twc/certs to c:\Program Files\MapleMBSE 2019\certs (in x64 environment)

3) Execute the following command by using something like a shortcut
    "c:\Program Files\MapleMBSE 2019\MapleMBSE.exe" <LOCATION-OF-SST-Tr2.MSE>/SST-Tr2.MSE "twc://twc.openmbee.org:8080/Track 2 - Requirements V&V?ssl=cert&cache=true&username=<YOUR USERNAME>"

   