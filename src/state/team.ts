import { computed, ref, reactive } from "vue";

const adamFactAnswer = ref("I love to play card games, particularly cribbage.")
const adamOsgoodeAnswer = ref("I love the students and mentors at Osgoode who truly make for an exceptional community. Students at Osgoode act as mentors and resources and genuinely make a point of getting to know everyone, making sure students feel a part of such a special community.")
const adamPictureCaption = ref("O-week co-chair Adam Donaldson standing in a field with sunglasses on and a bright blue sky above.")

const devinFactAnswer = ref("I once tried to make a fruit salad that called for 2 tsp of cinnamon, but I was ABSOLUTELY certain the recipe said two tbsp, despite protests from multiple people. Turns out it definitely did not!")
const devinOsgoodeAnswer = ref("Definitely the people! Coming to Osgoode was my first time moving away from home and the community was incredibly supportive! The opportunities to get involved are also second to none!")
const devinPictureCaption = ref("O-week co-chair Devin Glim smiling and holding two thumbs up.")

const chloeFactAnswer = ref("After reading The Girl with a Dragon Tattoo, I tried to learn how to code and bought a bunch of super legit-looking fake tattoos.")
const chloeOsgoodeAnswer = ref("If you allow it to, law school will completely change the way you look at the world. The opportunity to experience that growth surrounded by such amazing classmates, is truly an incredible journey.")
const chloePictureCaption = ref("O-week co-chair Chloé Duggal standing in a green field with trees in the background.")

const johnFactAnswer = ref("I am an avid sports fan, particularly basketball. Prior to Osgoode, I played at the University level for 5 years.")
const johnOsgoodeAnswer = ref("The collegial environment at Osgoode that allowed me to make a smooth transition into law school. As well, the various extracurricular opportunities that have allowed me to build long lasting friendships.")
const johnPictureCaption = ref("O-Week executive member Jonathan Wallace standing in a suit with a sea of water and greenery in the distance behind him.")

const courtneyFactAnswer = ref("I adopted a rambunctious siamese cat named Stanley during lockdown.")
const courtneyOsgoodeAnswer = ref("The community! There are so many clubs and groups at Osgoode, there’s truly a place for everyone.")
const courtneyPictureCaption = ref("A selfie of O-Week Executive Courtney Cameron smiling.")

const naomiFactAnswer = ref("I read the Harry Potter series for the first time in quarantine and LOVED it. Harry Potter Fans don’t come @ me I’m sorry it took me so long.")
const naomiOsgoodeAnswer = ref("Definitely the people! Everyone at Osgoode is SO friendly and they make you feel like you’re a part of a community. Classmates and upper-years are always willing to help if you have a question or if you need tips for absolutely anything school/law/job related.")
const naomiPictureCaption = ref("O-Week exec member Naomi Santesteban standing in front of a large field.")

const vaughnFactAnswer = ref("I played on the York Varsity Baseball team during 1L.")
const vaughnOsgoodeAnswer = ref("The supportive and collaborative nature of my peers. The Osgoode community wants everyone to succeed!")
const vaughnPictureCaption = ref("O-week exec member Vaughn Rawes sits on a patio smiling at the camera.")

const jamieFactAnswer = ref("I had to take a semester off of law school because I tumbled down an escalator. Whoops!")
const jamieOsgoodeAnswer = ref("The people... and the pub nights! I have met some of my favourite people at Osgoode. The community is so supportive and there are tons of opportunities to get involved.")
const jamiePictureCaption = ref("O-Week exec member Jamie Ernst sitting at an outdoor patio smiling with lush greenery behind her.")

const damianaFactAnswer = ref("Every summer since I was 16, I rewatch “Gilmore Girls” in its entirety (#TeamLogan)")
const damianaOsgoodeAnswer = ref("My hilarious and supportive classmates, and the natural, genuine mentorship from upper years!!! And L&L’s care packages (love the hats) :)")
const damianaPictureCaption = ref("O-Week exec member Damiana Pavone sitting on a courtyard bench smiling with a book in her hands.")

const ayeshaFactAnswer = ref("I went vegan for the animals 6 years ago & have loved every moment of it! ps if you love animals too, join the club that has my heart, @osgoodeanimaljustice 💗")
const ayeshaOsgoodeAnswer = ref("Despite my first year at Osgoode being entirely virtual, I felt consistently supported by upper years and always had someone to turn to for advice. My favourite part about Osgoode is definitely all the people that go out of their way to make it the warm community it is!")
const ayeshaPictureCaption = ref("O-week executive Ayesha Suri in a pink and white dress smiling and standing in front of a garage.")

const anaFactAnswer = ref("I have a book of famous Vines.")
const anaOsgoodeAnswer = ref("The cinnamon buns at the Bistro….. And obviously my classmates!")
const anaPictureCaption = ref("O-Week Exec Member Ana Savic sitting on a bench outside smiling with her chin resting on her hand and plants behind her.")

const valerieFactAnswer = ref("I can recite 90% of the script from Step Brothers.")
const valerieOsgoodeAnswer = ref("Not only will you meet some of your best friends, but there is also a club/ group for anything and everything you could want to get involved with! I hope you have an amazing O-Week!!")
const valeriePictureCaption = ref("O-Week Exec Member Valerie Sedlezky sitting on a mosaic tiled bench outside smiling.")

const alexFactAnswer = ref("I’ve been skiing in July!")
const alexOsgoodeAnswer = ref("The people around you! Everyone at osgoode is SO nice and the culture is both supportive and fun. We have so many clubs, clinics, and opportunities, there’s something for everyone!")
const alexPictureCaption = ref("Selfie of O-Week executive member Alex Mulligan laying in bed with his right arm resting on his left shoulder.")

const laurenFactAnswer = ref("I am really good at hula-hooping")
const laurenOsgoodeAnswer = ref("The Osgoode community is incredible! There are so many amazing ways to get involved. The opportunities are endless and you’ll meet people who become your best friends. Happy O Week!")
const laurenPictureCaption = ref("O-Week Exec Member Lauren O’Donohue smiling while on a boat with a sea of water behind her and greenery in the distance.")

const phoebeFactAnswer = ref("I watch the Office religiously.")
const phoebeOsgoodeAnswer = ref("Osgoode is a place where everyone feels at home. I’ve met my best friends at Osgoode, all while being exposed to new perspectives and experiences. I am so grateful to have had this opportunity and look forward to making new friends and new memories this year.")
const phoebePictureCaption = ref("O-Week Exec Member Phoebe Goldig wearing a suit and smiling while standing in the Osgoode building.")

const fawadFactAnswer = ref("I love to watch basketball, but hate to watch the Raptors.")
const fawadOsgoodeAnswer = ref("Osgoode has an amazing environment with tremendous help from both students and staff. The Osgoode community has been very helpful this past year as all classes were help online. The staff helps to ensure students get the the fullest experience as possible. Something that I really cherished during my first year at Osgoode.")
const fawadPictureCaption = ref("Professional shot of O-Week executive member Fawad Ghulami smiling in a suit beside a flag.")

const marioFactAnswer = ref("Pizzaiolo in-training. Instagram: @pizzadimario_")
const marioOsgoodeAnswer = ref("What can I say? The people, my friends, are what make Osgoode great. Ya, learning about the law is great and all, but the people you meet along the way are what make law school worth it.")
const marioPictureCaption = ref("Side profile shot of O-Week executive member Mario Lofranco drinking out of a small black cup at a restaurant.")

export {
  adamFactAnswer,
  adamOsgoodeAnswer,
  adamPictureCaption,
  devinFactAnswer,
  devinOsgoodeAnswer,
  devinPictureCaption,
  chloeFactAnswer,
  chloeOsgoodeAnswer,
  chloePictureCaption,
  johnFactAnswer,
  johnOsgoodeAnswer,
  johnPictureCaption,
  courtneyFactAnswer,
  courtneyOsgoodeAnswer,
  courtneyPictureCaption,
  naomiFactAnswer,
  naomiOsgoodeAnswer,
  naomiPictureCaption,
  vaughnFactAnswer,
  vaughnOsgoodeAnswer,
  vaughnPictureCaption,
  jamieFactAnswer,
  jamieOsgoodeAnswer,
  jamiePictureCaption,
  damianaFactAnswer,
  damianaOsgoodeAnswer,
  damianaPictureCaption,
  ayeshaFactAnswer,
  ayeshaOsgoodeAnswer,
  ayeshaPictureCaption,
  anaFactAnswer,
  anaOsgoodeAnswer,
  anaPictureCaption,
  valerieFactAnswer,
  valerieOsgoodeAnswer,
  valeriePictureCaption,
  alexFactAnswer,
  alexOsgoodeAnswer,
  alexPictureCaption,
  laurenFactAnswer,
  laurenOsgoodeAnswer,
  laurenPictureCaption,
  phoebeFactAnswer,
  phoebeOsgoodeAnswer,
  phoebePictureCaption,
  fawadFactAnswer,
  fawadOsgoodeAnswer,
  fawadPictureCaption,
  marioFactAnswer,
  marioOsgoodeAnswer,
  marioPictureCaption
};
