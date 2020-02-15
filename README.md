# Mini Apps template

This project is a boilerplate for creating new application on 
[VK Mini Apps](https://vk.com/vkappsdev) platform. We tried to escape all
currently existing problems in development and offer this project as a base
for your new application.

Boilerplate is based on this stack:
- Create React App
- VK Connect
- React Redux (with devtools extension and `unionize`)
- Typescript

## Starting project on vk.com and m.vk.com
At this time VKontakte requires https address of your application. To get it we 
need to launch CRA in secure mode. For this, we used HTTPS=true
variable before launching react-scripts. 

In this project, to launch secure mode use command:

 ```bash 
yarn start:https
```

After project started, you will get 2 addresses - `Local` and `On Your Network`.
You have to use `On Your Network` address. Directly open it in your browser
and press `Trust certificate`. Then, you can use this address in settings
of your application, sections for `vk.com` and `m.vk.com`.

## Starting project in native application

There is a problem launching project in native application. Guide from previous
section will not work due to WebView works the other way. To get correct
https address we have to launch project in http mode and create ngrok runnel
which will give us https address.
 
To launch project in http mode:
```bash
yarn start:http
```

To launch ngrok tunnel:
```bash
yarn tunnel
```

After ngrok tunnel is created, take https address and use it in settings.

> **WARNING**
>
> Ngrok has limitations on concurrent connections and requests per certain
> period of time. So, if you will try to load a lot of assets through
> short period of time, tunnel will be blocked and you will have to create a
> new one.
