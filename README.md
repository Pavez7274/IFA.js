### ABOUT
ifa.js is an improved version of [aoi.js](https://www.npmjs.com/package/aoi.js), it adds functions, new methods, the idea is to improve the user experience
- - -
### Setting
```js
const { Bot } = require('ifa.js')
const bot = new Bot({
	token: 'YOUR_TOKEN', // Your discord bot token
	intents: [ 'GUILD', 'GUILD_MESSAGES' ], // Discord intents or 'all'
	prefix: ['!'], // Bot prefix
	distube: {...}, // Distube options
	giveaways: {...} // Giveaways options
})

bot.onMessage() // Allows to execute Commands
```

### Distube
```js
// Example
bot.addSongCommand({
	code: '$sendMessage[added `$var[song.name]`;$var[queue.textChannel.id];no]'
})
bot.onAddSong()

//  Event  |  Command  |  Handler type
onAddSong() | addSongCommand() | 'addSong'
onAddList() | addListCommand() | 'addList'
onFinish() | finishCommand() | 'finish'
onEmpty() | emptyCommand() | 'empty'
onPlaySong() | playSongCommand() | 'playSong'
onFinishSong() | finishSongCommand() | 'finishSong'
onDisconnect() | disconnectCommand() | 'disconnect'
onNoRelated() | noRelatedCommand() | 'noRelated'
onDeleteQueue() | deleteQueueCommand() | 'deleteQueue'
onDistubeError() | distubeErrorCommand() | 'distubeError'

// Functions
$autoplay
$jump[how many]
$pause
$playSong[query;skip?;unshift?]
$previous
$queueLength
$repeatMode
$resume
$search[query;type?;sfw?]
$seek[time]
$shuffle
$skip[format?]
$stop
$trackInfo[index;format]
$volume[new volume?]
```
> u can use $djsEval[d.client._distube]

- - -
### New Functions
- $parseInt
- $isNaN
- $startGiveaway[channelID;winnerCount;prize;duration;hostedBy?;botsCanWin?;reaction?]
- $startJsonGiveaway[options]
- $reroll[channelID;messageID]
- $pauseGiveaway[channelID;messageID]
- $resumeGiveaway[channelID;messageID]