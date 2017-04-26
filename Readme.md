# Bot Preview
Is an environment for testing Messenger Bot flows

## How to use
---
```
const botPreview = require('bot-preview');
const config = {
    flowsDirectory: __dirname + '/flows',
    configFile: __dirname + '/config.json',
};

botPreview.start(config);
```

## Setting a config file
---
Just create a config.json file with this fields:
```
{
  "loop": false,
  "likes": "35K",
  "botName": "Example Bot",
  "botCategory": "Shopping",
  "botWelcomeMessage": "Hi User, Welcome!",
  "displayedCarrier": "Carrier"
}
```

# How to create a flow
---
A preview flow is just txt file with an especial format, we can mock:
- Bot message
- User message
- Typing indicator
- Quick reply
- Quick reply selection
- Button template
- Button template selection
- Generic cards
- Scroll generic cards
- Select a generic card button

**See ./flows/test.txt**

### Bot message
```
bot::"Hello there, this is a message from bot"
```

### User message
```
user::"Hello there, this is a message from user"
```

### Typing indicator
```
...
```

### Quick reply
```
['option 1', 'option 2', 'option 3']
```

### Quick reply selection
qr::<index>

```
qr::0
```

### Button template
```
"This is a text for buttons"::['button 1', 'button 2']
```

### Button template selection
bt::<index>

```
bt::1
```

### Generic cards
Start a generic card carrousel use !# and end it with #! to create a new card use >
```
!#
imageUrl::https://i.ytimg.com/vi/56ucT_Hw4bg/hqdefault.jpg
title::This is the first card
subtitle::this is a card sub title
buttons::option one|option two
>
imageUrl::https://i.ytimg.com/vi/56ucT_Hw4bg/hqdefault.jpg
title::This is a second card
subtitle::Did you see it?
buttons::Yes, i see it|Nop
>
imageUrl::https://i.ytimg.com/vi/56ucT_Hw4bg/hqdefault.jpg
title::This is a third card
subtitle::Did you see it?
buttons::Yes, i see it|Nop
#!
```

### Scroll generic cards
scroll::<index>

```
scroll::1
```

### Select a generic card button
sc::<index>

```
sc::0
```

---

# Credits
---
This library is using [jQuery.fbMessenger](https://github.com/digitalbreed/jquery.fbmessenger) of Matthias Gall

# Legal
---
This project is a spare time project of Rodrigo Navarro and in no way affiliated with Facebook.

"Facebook" is a registered trademark of Facebook, Inc., Menlo Park Calif., US. "iPhone" is a registered trademark of Apple Inc., Cupertino Calif., US. Other mentioned trademarks are trademarks of their respective owners.

Licensed under MIT license terms. See file LICENSE.

---

> This is an experimental library, Feel fre to contribute, fork and email me rodrigonavarro23@gmail.com