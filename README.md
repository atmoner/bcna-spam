<p align="center"> 
  <img src="https://i.imgur.com/B6jaa8C.png" alt="Cosmos-tool"> 
</p>
<h1 align="center">
    Bcna-spam
</h1>
 

<p align="center">
⭐ Bcna-spam tool!<br /><br />
</p>

|Spam !![image](https://user-images.githubusercontent.com/1071490/122655846-52617780-d145-11eb-8719-72d7097c317f.png)|Spam2 ![image](https://user-images.githubusercontent.com/1071490/122655874-8a68ba80-d145-11eb-9fb7-be7d8ccc7a2a.png) |
|--|--|
 





## Prerequisites

```node version >=14.0.0```

## Installation

```sh
git clone https://github.com/atmoner/bcna-spam.git
cd bcna-spam
npm i
```
## Config
```sh
nano config.json
```
Edit this part with your value:  
```
{
	"mnemonic":"",
	"chainId":"bitcanna-testnet-3", 
	"lcdUrl":"http://seed1.bitcanna.io:1317",
	"denom":"ubcna",
	"prefix":"bcna",
	"feeAmount":5000,
	"gasLimit":200000,
	"setInt":250,
	"memo":"Send from Bcna-Spam"
}
```  


## Run it 
```
node bot.tx.js
```

