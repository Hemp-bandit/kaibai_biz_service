#/bin/sh
git_hash=$(git rev-parse --short=8 HEAD)
registry="registry.cn-hangzhou.aliyuncs.com/wyswill_docker"
pkg_name="kai_bai_service"

docker_tag="$registry/$pkg_name:$git_hash"
echo "docker_tag: $docker_tag"
function build_img() {
  echo "build img"
  docker build -t $docker_tag -f ./dockerfile .
}

function push_img() {
  echo "push img"
  docker push $docker_tag
}

function login_ali(){
  docker login --username=15717827650 -p wyswill4290 registry.cn-hangzhou.aliyuncs.com
}

case $1 in
  "build_img")
    build_img
    ;;
  "push_img")
    push_img
    ;;
  "login_ali")
    login_ali
    ;;
  *)
    echo "comd has push_img、build_img"
    ;;
esac