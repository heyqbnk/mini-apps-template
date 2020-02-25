# Mini Apps template

Boilerplate for creating new application on 
[VK Mini Apps](https://vk.com/vkappsdev) platform. We tried to escape all
currently existing problems in development and offer this project as a base
for your new application.

Boilerplate is based on stack:
- Create React App
- VK Connect
- VK UI
- VK Icons
- React Redux (with devtools extension and `unionize`)
- Typescript
- JSS

## Features

Currently, this template contains best practices needed for comfortable 
development. Code contains certain intuitive workflow and comments for
almost every line of code. There are these features inside:

- Preloading of assets to imitate real native application behaviour. It means,
when we are using native application, we download it, we download every asset
not to do it during the application lifetime. So it will not make our screen
blink and look much better;
- Config creation via environment variables;
- Codeflow
    - Wait for assets to be loaded;
    - Loading view while appilcation is loading;
    - Error view if error occurred while initialization;
    - Application if initialization is complete;
- Automatic detection of insets. Useful for iPhone X and other phones with
insets;
- Automatic application config detection via vkconnect;
- Automatic theming via JSS. JSS is watching for current appearance and color
scheme of device and returns appropriate theme;

## Development

### Starting project on vk.com and m.vk.com
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

### Starting project in mobile client version

There is a problem launching project in native application. Guide from previous
section will not work due to WebView works the other way. To get correct
https address we have to launch project in http mode and create ngrok tunnel
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
> Currently, "URL for developers" in Mobile client version does not work.
> You have to use "URL" field.
>
> Ngrok has limitations on concurrent connections and requests per certain
> period of time. So, if you will try to load a lot of assets through
> short period of time, tunnel will be blocked and you will have to create a
> new one.
