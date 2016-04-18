Beverland design sprint
=====

This proof of concept illustrates the use of taxonomies as linked open data to link keywords to. Keywords are added to letters by Hadriaan Beverland.

It is not meant to be used as stable software.


Running in docker
----

This application is hosted on docker hub and can be started from a fresh clone of this repository. Therefore to run this app out-of-the-box docker is a prereqiusite.

Under linux / debian-like systems:
---

```sh
$ git clone https://github.com/HuygensING/beverland-design-sprint.git
$ cd beverland-design-sprint
$ ./start-app.sh
```

Then navigate to: http://localhost:3000


Windows on docker
---

1. Download and install the [docker toolbox](https://docs.docker.com/toolbox/overview/#ready-to-get-started)
2. Enable virtualization ([instructions](https://docs.docker.com/windows/step_one/))
3. Lauch Docker Quickstart

From there type in these commands. 

```sh
$ git clone https://github.com/HuygensING/beverland-design-sprint.git
$ cd beverland-design-sprint
$ ./start-app.sh
```

Depending on your band-width and hardware this can take up to 15 minutes to complete.

When you see these messages (the numbers can vary a little) the app is up and running:

```sh
express listening on port: 5001
express listening on port: 5002
[BS] Access URLs:
 -----------------------------------
       Local: http://localhost:3000
    External: http://172.17.0.3:3000
 -----------------------------------
          UI: http://localhost:3001
 UI External: http://172.17.0.3:3001
 -----------------------------------
[BS] Serving files from: ./build/development
```

You can now close this window. And open the app called Kitematic (Alpha). 

In the column to the left there should be two listed _containers_ there with a random main name and a sensible subtitle being:

- mongo
- beverland-design-sprint

Both _containers_ have to be up and running for the app to work. You can check this by looking at the play/stop buttons on top.

If they are not running start them by pressing the _play_ button for both in exactly this order:

1. (random name 1) mongo
2. (random name 2) beverland-design-sprint

To the right there should be a web preview from where you can press the ![external link](https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/external-128.png) icon to open the app in your default browser.

Alternatively you can type in this IP address in the address bar of your favourite web browser:

```
192.168.99.100:3000
```
