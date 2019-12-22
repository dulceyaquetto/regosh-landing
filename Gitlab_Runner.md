
# Gitlab Pages setup

## Step 1: Check the requirements

- Other server (or virtual server): According to the docs for setting up gitlab runner, it's recommended to choose server different from the server is running the gitlab instance.
- domain name which is using the gitlab instance
- secret token which gitlab instance provides to link to a GitLab Runner instance

## Step 2: Setting up requirements (following docker set up version)

- In the server is going to be uses as a GitLab Runner:
    - make sure docker is installed. If not then install docker
    
            curl -sSL https://get.docker.com/ | sh

    - install gitlab runner with the following command line

            docker run -d --name gitlab-runner --restart always \
              -v /srv/gitlab-runner/config:/etc/gitlab-runner \
              -v /var/run/docker.sock:/var/run/docker.sock \
              gitlab/gitlab-runner:latest

    - gitlab runner cli will prompt you for gitlab domain name -> in CI/CD settings in admin panel of gitlab can be found
    - gitlab runner cli will prompt you for gitlab token -> in CI/CD settings in admin panel of gitlab can be found
    - gitlab runner cli will prompt you for a description for the gitlab runner -> Just put a simple description
    - gitlab runner cli will prompt you for a tags for the gitlab runner -> (Optional) just for tagging some jobs

## References (docs & tutorials)

- https://docs.gitlab.com/ee/administration/pages/index.html
- https://docs.gitlab.com/runner/install/docker.html
- https://www.youtube.com/watch?v=dD8c7WNcc6s
- https://www.youtube.com/watch?v=fMdIH-L5Uvg