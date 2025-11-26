#!/bin/bash

build_and_push_image() {
  set -e  # Exit immediately if a command exits with a non-zero status

    # Arguments passed from Jenkinsfile
    local image_name="msc-identity-fe"
    local image_tag="$1"
    new_image_tag="docker.pmr.vn/$image_name:$image_tag"

    echo "===== Docker Build & Push ====="
    echo "Building Docker image"
    docker build -t "$image_name" . 2>&1 | tee build.log
    docker tag "$image_name" "$new_image_tag"

    echo "Pushing Docker image"
    docker push "$new_image_tag"

    echo "Docker build & push finished successfully!"
}

git submodule init
git submodule sync
git submodule update

build_and_push_image "$1"
