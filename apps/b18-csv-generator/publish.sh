
# TODO not production ready
# taken from here
# https://confluence.diamond.ac.uk/display/CLOUD/Container+Registry
# also see this https://gitlab.diamond.ac.uk/lims/pato-helm
module load argus # this will make the gcloud and gsutil tool available on your PATH
gcloud auth login # this will pop up a browser window which will ask you to login to google cloud console. Use you diamond.ac.uk email address
gcloud auth configure-docker # this will add configuration file to ~/.docker/config.json

ls
podman build --format docker $NAME
podman tag $NAME $PUBLISH_URL
podman push $PUBLISH_URL

