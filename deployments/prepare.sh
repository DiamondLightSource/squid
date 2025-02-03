
tmp_location="bootstrap-popout-windows"
# todo assign which registry - private or public
# todo consider creating the dockerfile dynamically from a template

# based on this https://confluence.diamond.ac.uk/pages/viewpage.action?spaceKey=CLOUD&title=Container+Registry
module load argus
gcloud auth login 
gcloud auth configure-docker
dockerfile_path="deployments/Dockefile.$tmp_location"
podman build --format docker -f $dockerfile_path -t $tmp_location:latest .
new_tag="gcr.io/diamond-privreg/$tmp_location:latest"
podman tag $tmp_location:latest $new_tag

podman images

podman push $new_tag

kubectl apply -f deployments/$tmp_location.yaml
