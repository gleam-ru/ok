e:
cd tst_system
git pull & git checkout
taskkill /IM cmd.exe /FI "WINDOWTITLE eq grunt"
npm i
node app --prod
