#!/usr/bin/env sh
# run 'sh deploy.sh'

# 确保脚本抛出遇到的错误
set -e

# 更新master文件
git add -A
git commit -m 'update master'
git push

# 生成静态文件
pnpm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

echo "mobs.fun" >> CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:AkiyamaMinami/akiyamaminami.github.io.git master:gh-page

cd -