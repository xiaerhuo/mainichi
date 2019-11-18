git checkout master

set -e
echo 'Please input release version:'
read VERSION

read -p "Will release $VERSION, --- are you sure? (y/n) ---" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    npm run build
    if [[ `git status --porcelain` ]];
    then
        git add .
        git commit -am "build: compile $VERSION"
    fi

    # version commit
    npm version $VERSION --message "build: release $VERSION"

    git push origin master

    if [[ $VERSION =~ beta ]]
    then
        npm publish --tag beta
    else
        npm publish
    fi
    # 切回测试分支staging
    git checkout staging
    git rebase master
    git push origin staging
fi
