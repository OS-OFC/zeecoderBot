import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Botly from 'botly';
import axios from 'axios';
import * as cheerio from 'cheerio';
dotenv.config();
const app = express();

const PageID = '438150649381490';
const accessToken = 'EAAQZAreYDFncBO2ZCQAEMvCZAV4KQF9rECLrGDtdTEA6eCx26Tbcy9ZAG39vUDBm4ZBr9LafWiiWCZAd6CHijiLtIi0xjHRCXXtNiimtxTlOlynZAWBloxwYKEcCIWCpSuOtjC1d4pFxPGqZBTa9mvDbb7nZBkCGUR2MLCBGFIugWyKDZCnycOMgIxGM91L0eygboXb08qsJyXKMluoVSQEwZDZD'
const appSecret = 'd411bb5860586361bdb0b0517b975153'


/*--------- page database ---------*/
const botly = new Botly({
  accessToken: accessToken,
  verifyToken: '12345678',
  webHookPath: process.env.WB_PATH,
  notificationType: Botly.CONST.REGULAR,
  FB_URL: "https://graph.facebook.com/v18.0/",
});

/*--------- Functions ---------*/
app.get("/", function (_req, res) {
  res.sendStatus(200);
});
app.use(
  bodyParser.json({
    verify: botly.getVerifySignature(appSecret),
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/webhook", botly.router());
botly.on("message", async (senderId, message, data) => {
  //aaaaaaaaaaaaa
  botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.MARK_SEEN});
  botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.TYPING_ON});

  /*--------- s t a r t ---------*/
  if (message.message.text) {
    //
  const lang = "python";
  const msg = message.message.text
    fetchGeneratedCode(msg, lang)
    .then(text => botly.sendText({id: senderId, text: text}))
    .catch(error => {
      console.error(error);
      botly.sendText({id: senderId, text: "حدث خطأ، أعد المحاولة لاحقاً."});
    });
//
    } else if (message.message.attachments[0].payload.sticker_id) {
      botly.sendText({id: senderId, text: "يرجى ارسال النصوص فقط ❤️"});
    } else if (message.message.attachments[0].type == "image") {
        botly.sendText({id: senderId, text: "يرجى ارسال النصوص فقط ❤️"});
    } else if (message.message.attachments[0].type == "audio") {
      botly.sendText({id: senderId, text: "يرجى ارسال النصوص فقط ❤️"});
        } else if (message.message.attachments[0].type == "video") {
      botly.sendText({id: senderId, text: "يرجى ارسال النصوص فقط ❤️"});
    }
  /*--------- e n d ---------*/
//botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.TYPING_OFF}); 
});
botly.on("postback", async (senderId, message, postback, data, ref) => {
 //aaaaaaaaaa
  botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.MARK_SEEN});
  //aaaaaaaa
  botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.TYPING_ON});
    /*--------- s t a r t ---------*/
    if (message.postback){ // Normal (buttons)
    if (postback == "GET_STARTED"){           botly.sendGeneric({id: senderId, elements: {
                title: "سعيد بلقاءك ❤️",
                image_url: "https://telegra.ph/file/77edfdf7b35823caf90f6.jpg",
                subtitle: "ارسل لي كلما في بالك لاحوله الى كود",
                buttons: [
                  botly.createPostbackButton("مطور البوت 🇲🇦😄", "Owner"),
                ]}, aspectRatio: Botly.CONST.IMAGE_ASPECT_RATIO.HORIZONTAL});

    } else if (postback == "Owner") {
        botly.sendGeneric({id: senderId, elements: {
           title: "Morocco AI",
           image_url: "https://telegra.ph/file/6db48bb667028c068d85a.jpg",
           subtitle: " اضغط لمتابعة الصفحة ❤️👇🏻",
           buttons: [
              botly.createWebURLButton("صفحة المطور 🇲🇦😄", "https://www.facebook.com/profile.php?id=100090780515885")]},
            aspectRatio: Botly.CONST.IMAGE_ASPECT_RATIO.HORIZONTAL});
      } else if (postback == "bots") {
      botly.sendText({id: senderId, text: `قائمة روبوتاتنا 🇲🇦😍`,
      quick_replies: [
         botly.createQuickReply("Atlas-GPT", "Atlas-GPT")]});
    }
  } else { // Quick Reply
   if (postback == "Owner") {
      botly.sendGeneric({id: senderId, elements: {
         title: "Morocco AI",
         image_url: "https://telegra.ph/file/6db48bb667028c068d85a.jpg",
         subtitle: "صفحة المطور 🇲🇦😄",
         buttons: [
            botly.createWebURLButton("مطور البوت 🇲🇦😍", "fb.com/Morocco.Openai")]},
          aspectRatio: Botly.CONST.IMAGE_ASPECT_RATIO.HORIZONTAL});
     }
  }
   /*--------- e n d ---------*/
 //aaaaa
  botly.sendAction({id: senderId, action: Botly.CONST.ACTION_TYPES.TYPING_OFF});
});
/*------------- RESP -------------*/
botly.setGetStarted({pageId: PageID, payload: "GET_STARTED"});
botly.setGreetingText({
    pageId: PageID,
    greeting: [
      {
        locale: "default",
        text: "zzzai on fb"
      }
    ]
  });
botly.setPersistentMenu({
    pageId: PageID,
    menu: [
        {
          locale: "default",
          composer_input_disabled: false,
          call_to_actions: [
            {
              type:  "web_url",
              title: "صفحة المطور 🇲🇦😄",
              url:   "fb.com/Morocco.Openai/",
              webview_height_ratio: "full"
            }
          ]
        }
      ]
  });
/*------------- RESP -------------*/
const port = 8080

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

async function fetchGeneratedCode(msg, lang) {
  try {
    let postData = JSON.stringify({
      "id": "",
      "p1": lang,
      "p2": msg,
      "p3": "",
      "p4": "",
      "p5": "",
      "option1": "2 - Generate code",
      "option2": "Professional",
      "option3": "English",
      "hasBlocker": true
    });

    let postConfig = {
      method: 'POST',
      url: 'https://zzzcode.ai/api/tools/code-generator',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; RMX3430 Build/SP1A.210812.016) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.6533.103 Mobile Safari/537.36',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Content-Type': 'application/json',
      },
      data: postData
    };
    const postResponse = await axios.request(postConfig);
    const responseData = postResponse.data;
    const regex = /zzzredirectmessageidzzz:\s*([a-zA-Z0-9\-]+)/;
    const match = responseData.match(regex);

    if (match && match[1]) {
      const redirectMessageId = match[1];
      let getConfig = {
        method: 'GET',
        url: `https://zzzcode.ai/code-generator?id=${redirectMessageId}`
      };
      const getResponse = await axios.request(getConfig);
      const $ = cheerio.load(getResponse.data);
      const textareaContent = $('#uiOutputContent').text();
      return textareaContent;
    } else {
      throw new Error("حدث خطأ ما");
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
