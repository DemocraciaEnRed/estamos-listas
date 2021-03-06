# si no están los node modules, instalarlos
[ -d node_modules ] || npm install

# si docker no está prendido, prenderlo
pgrep dockerd > /dev/null || sudo systemctl start docker

# si el container no está corriendo, arrancarlo
docker inspect --format="{{.State.Status}}" mongodb-ccdd | grep -q running || docker start mongodb-ccdd

# si no estamos usando node v6, cambiar a esa
node -v | grep -q v6 || nvm use v6.17.1

# finalmente, levantar el sistema (bws=build watch serve)
NODE_PATH=. DEBUG=democracyos* gulp bws
