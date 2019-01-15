#!/usr/bin/env bash

# Web Page of BASH best practices https://kvz.io/blog/2013/11/21/bash-best-practices/
#Exit when a command fails.
set -o errexit
#Exit when script tries to use undeclared variables.
set -o nounset
#The exit status of the last command that threw a non-zero exit code is returned.
set -o pipefail

#Trace what gets executed. Useful for debugging.
#set -o xtrace

# Set magic variables for current file & dir
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"
__root="$(cd "$(dirname "${__dir}")" && pwd)"

function usage(){
    echo "Usage"
    echo "1 - d (development) or p (production)"
}

STAGE=
if [ $# -lt 1 ]; then
    echo -e "Illegal number of parameters"
    echo -e "$(usage)"
    exit 1;
else
    if [ "${1}" != "d" ] && [ "${1}" == "p" ]; then
        echo -e "Illegal number of parameters"
        echo -e "$(usage)"
        exit 1;
    fi
    STAGE=${1}
fi

echo -ne "Checking environment file: "
if [ ! -f ".env" ]; then
    echo -ne "added from environment/"
    if [ "${STAGE}" == "d" ]; then
        cp environment/.dev.env .env
        echo ".dev.env"
    else
        cp environment/.prod.env .env
        echo ".prod.env"
    fi
else
    echo "already exits."
fi
echo -ne "Checking keys file: "
if [ ! -f "keys/key.b64.pub" ]; then
    echo "not found. Generating new ones"
    ./scripts/keys_generator.sh
else
    echo "already exists."
fi

echo -ne "Checking app_tokens file: "
if [ ! -f "app_tokens.json" ]; then
    echo "not found. Creating a empty one."
    echo "[]" > app_tokens.json
else
    echo "already exists."
fi