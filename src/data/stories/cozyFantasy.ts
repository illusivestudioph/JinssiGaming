import type { Story } from '../stories';

export const cozyFantasyBooks: Story[] = [
  {
    id: 'alice-in-wonderland',
    slug: 'alices-adventures-in-wonderland',
    title: "Alice's Adventures in Wonderland",
    synopsis: 'Tired of sitting on the riverbank, curious young Alice tumbles down a rabbit hole into an absurd, delightful subterranean world of tea parties, grinning cats, hookah-smoking caterpillars, and talking playing cards.',
    author: 'Lewis Carroll',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    coverAlt: 'Antique pocket watch with tea cup and vintage storybooks.',
    status: 'Completed',
    genre: 'Cozy Fantasy',
    tags: ['Public Domain', 'Fantasy', 'Whimsy', 'Tea Parties', 'Classic'],
    totalChapters: 12,
    rating: 5,
    readsCount: 6140,
    isPublicDomain: true,
    chapters: [
      {
        id: 'alice-ch1',
        chapterNumber: 1,
        title: 'Down the Rabbit-Hole',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: '1865',
        authorNote: 'The famous descent into Wonderland.',
        content: [
          'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice, "without pictures or conversations?"',
          'So she was considering in her own mind whether the pleasure of making a daisy-chain would be worth the trouble of getting up, when suddenly a White Rabbit with pink eyes ran close by her.',
          'There was nothing so very remarkable in that, until the Rabbit actually took a watch out of its waistcoat-pocket, looked at it, and hurried on! Alice started to her feet, ran across the field after it, and popped down a large rabbit-hole under the hedge.',
          'Down, down, down. Would the fall never come to an end? "I wonder how many miles I’ve fallen by this time?" she said aloud, floating past cupboards, bookshelves, and marmalade jars.'
        ]
      },
      {
        id: 'alice-ch2',
        chapterNumber: 2,
        title: 'The Pool of Tears',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1865',
        authorNote: 'Curiouser and curiouser!',
        content: [
          '"Curiouser and curiouser!" cried Alice; "now I’m opening out like the largest telescope that ever was! Good-bye, feet!"',
          'For when she looked down at her feet, they seemed to be almost out of sight. Just at this moment her head struck against the roof of the hall: in fact she was now more than nine feet high!',
          'She sat down and began to cry again, shedding gallons of tears until there was a large pool all around her, reaching half down the hall.',
          'Presently she heard a little pattering of feet in the distance. It was the White Rabbit returning, splendidly dressed, with a pair of white kid gloves in one hand and a large fan in the other.'
        ]
      },
      {
        id: 'alice-ch3',
        chapterNumber: 3,
        title: 'A Caucus-Race and a Long Tale',
        wordCount: 810,
        readTimeMinutes: 4,
        publishedDate: '1865',
        authorNote: 'The birds and animals dry off by running in circles.',
        content: [
          'They were indeed a queer-looking party that assembled on the bank—the birds with draggled feathers, the animals with their fur clinging close to them, and all dripping wet, cross, and uncomfortable.',
          'The Dodo solemnly proposed a Caucus-race. "What is a Caucus-race?" said Alice.',
          '"Why," said the Dodo, "the best way to explain it is to do it." First it marked out a race-course, in a sort of circle, and then all the party were placed along the course, here and there.',
          'There was no "One, two, three, and away," but they began running when they liked, and left off when they liked, so that it was not easy to know when the race was over. At the end, the Dodo called out: "Everybody has won, and all must have prizes!"'
        ]
      },
      {
        id: 'alice-ch4',
        chapterNumber: 4,
        title: 'The Rabbit Sends in a Little Bill',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1865',
        authorNote: 'Alice grows huge inside the White Rabbit’s tidy cottage.',
        content: [
          'The White Rabbit mistook Alice for his housemaid Mary Ann, and sent her into his neat little cottage to fetch his gloves and fan.',
          'On the dressing-table stood a little bottle with no label. Alice drank it, and grew so enormous that she had to put one arm out the window and one foot up the chimney.',
          'The Rabbit threw pebbles through the window, which magically turned into little cakes. Alice ate one, shrank back down, and escaped into the woods.'
        ]
      },
      {
        id: 'alice-ch5',
        chapterNumber: 5,
        title: 'Advice from a Caterpillar',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1865',
        authorNote: 'The Hookah-smoking blue caterpillar on top of the mushroom.',
        content: [
          'She stretched herself up on tiptoe, and peeped over the edge of the mushroom, and her eyes immediately met those of a large blue caterpillar, that was sitting on the top with its arms folded, quietly smoking a long hookah.',
          'The Caterpillar and Alice looked at each other for some time in silence: at last the Caterpillar took the hookah out of its mouth, and addressed her in a languid, sleepy voice.',
          '"Who are you?" said the Caterpillar.',
          'This was not an encouraging opening for a conversation. Alice replied, rather shyly, "I—I hardly know, sir, just at present—at least I know who I was when I got up this morning, but I think I must have been changed several times since that."',
          '"One side will make you grow taller, and the other side will make you grow shorter," said the Caterpillar, crawling into the grass.'
        ]
      },
      {
        id: 'alice-ch6',
        chapterNumber: 6,
        title: 'Pig and Pepper',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1865',
        authorNote: 'The Duchess’s kitchen and the grinning Cheshire Cat.',
        content: [
          'The door led right into a large kitchen, which was full of smoke from one end to the other: the Duchess was sitting on a three-legged stool in the middle, nursing a baby; the cook was leaning over the fire, stirring a large cauldron full of soup.',
          '"There’s certainly too much pepper in that soup!" Alice said to herself, as well as she could for sneezing.',
          'In the corner sat a large Cat grinning from ear to ear.',
          '"Please would you tell me," said Alice, "why your cat grins like that?"',
          '"It’s a Cheshire cat," said the Duchess, "and that’s why. Pig!" She tossed the screaming baby into Alice’s arms, which presently turned into a small pink pig and trotted into the woods.'
        ]
      },
      {
        id: 'alice-ch7',
        chapterNumber: 7,
        title: 'A Mad Tea-Party',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1865',
        authorNote: 'The March Hare, the Hatter, and the sleepy Dormouse.',
        content: [
          'There was a table set out under a tree in front of the house, and the March Hare and the Hatter were having tea at it: a Dormouse was sitting between them, fast asleep, and the other two were using it as a cushion.',
          '"No room! No room!" they cried out when they saw Alice coming.',
          '"There’s plenty of room!" said Alice indignantly, and she sat down in a large arm-chair at one end of the table.',
          '"Have some wine," the March Hare said in an encouraging tone.',
          'Alice looked all round the table, but there was nothing on it but tea. "I don’t see any wine," she remarked.',
          '"There isn’t any," said the March Hare.',
          '"Then it wasn’t very civil of you to offer it," said Alice angrily.',
          '"Why is a raven like a writing-desk?" asked the Hatter, fixing his large eyes upon her.'
        ]
      },
      {
        id: 'alice-ch8',
        chapterNumber: 8,
        title: 'The Queen’s Croquet-Ground',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1865',
        authorNote: 'Playing croquet with live flamingos, hedgehogs, and the Queen of Hearts.',
        content: [
          'A large rose-tree stood near the entrance of the garden: the roses growing on it were white, but there were three gardeners at it, busily painting them red.',
          'Presently the Queen of Hearts marched into the garden with her court of playing cards, shouting "Off with their heads!" at every minor inconvenience.',
          'The croquet ground was all ridges and furrows; the balls were live hedgehogs, the mallets live flamingos, and the soldiers had to double themselves up and stand on their hands and feet, to make the arches.',
          'Whenever Alice got ready to hit her hedgehog, the flamingo would twist its long neck around and gaze up into her face with a look of helpless curiosity.'
        ]
      },
      {
        id: 'alice-ch9',
        chapterNumber: 9,
        title: 'The Mock Turtle’s Story',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1865',
        authorNote: 'Meeting the Gryphon and the weeping Mock Turtle.',
        content: [
          'The Gryphon took Alice to see the Mock Turtle, who was sitting sad and lonely on a little ledge of rock, sighing as if his heart would break.',
          '"Once," said the Mock Turtle at last, with a deep sigh, "I was a real Turtle."',
          'These words were followed by a very long silence, broken only by an occasional sob from the Mock Turtle.',
          '"When we were little," the Mock Turtle went on, "we went to school in the sea. The master was an old Turtle—we used to call him Tortoise—"',
          '"Why did you call him Tortoise, if he wasn’t one?" Alice asked.',
          '"We called him Tortoise because he taught us," said the Mock Turtle angrily: "really you are very dull!"'
        ]
      },
      {
        id: 'alice-ch10',
        chapterNumber: 10,
        title: 'The Lobster Quadrille',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1865',
        authorNote: 'Dancing with sea animals and singing Beautiful Soup.',
        content: [
          'The Mock Turtle and the Gryphon demonstrated the Lobster Quadrille, bounding about on their hind legs and tossing lobsters into the sea.',
          '"Will you walk a little faster?" said a whiting to a snail. "There’s a porpoise close behind us, and he’s treading on my tail."',
          'Then the Mock Turtle sang in a voice choked with sobs:',
          '"Beautiful Soup, so rich and green, waiting in a hot tureen! Who for such dainties would not stoop? Soup of the evening, beautiful Soup!"'
        ]
      },
      {
        id: 'alice-ch11',
        chapterNumber: 11,
        title: 'Who Stole the Tarts?',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1865',
        authorNote: 'The King and Queen of Hearts hold trial for the Knave.',
        content: [
          'The King and Queen of Hearts were seated on their throne when they arrived, with a great crowd assembled about them.',
          'In the middle of the court was a table, with a large dish of tarts upon it: they looked so good, that it made Alice quite hungry to look at them.',
          'The White Rabbit blew three blasts on the trumpet, unrolled the parchment scroll, and read:',
          '"The Queen of Hearts, she made some tarts, all on a summer day: The Knave of Hearts, he stole those tarts, and took them quite away!"',
          '"Consider your verdict," the King said to the jury.',
          '"Not yet, not yet!" the Rabbit hastily interrupted. "There’s a great deal to come before that!"'
        ]
      },
      {
        id: 'alice-ch12',
        chapterNumber: 12,
        title: 'Alice’s Evidence & Waking Up',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1865',
        authorNote: 'Alice defies the court of cards and awakens on the riverbank.',
        content: [
          '"Here!" cried Alice, quite forgetting how large she had grown in the last few minutes, and she jumped up in such a hurry that she tipped over the jury-box with the edge of her skirt.',
          'The King shouted: "Rule Forty-two. All persons more than a mile high to leave the court."',
          '"I’m not a mile high," said Alice.',
          '"You are," said the King.',
          '"Nearly two miles high," added the Queen. "Off with her head!"',
          '"Who cares for you?" said Alice, having grown to her full natural size. "You’re nothing but a pack of cards!"',
          'At this the whole pack rose up into the air, and came flying down upon her: she gave a little scream, and found herself lying on the bank, with her head in the lap of her sister, who was gently brushing away some dead leaves that had fluttered down from the trees upon her face.',
          '"Wake up, Alice dear!" said her sister; "Why, what a long sleep you’ve had!"'
        ]
      }
    ]
  },

  {
    id: 'the-wind-in-the-willows',
    slug: 'the-wind-in-the-willows',
    title: 'The Wind in the Willows',
    synopsis: 'Kenneth Grahame’s poetic, comforting masterpiece of pastoral friendship. Mole, Ratty, Badger, and the reckless, lovable Mr. Toad mess about in boats, explore the Wild Wood, and reclaim Toad Hall.',
    author: 'Kenneth Grahame',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?w=800&q=80',
    coverAlt: 'A peaceful willow-lined river flowing gently under morning sunshine.',
    status: 'Completed',
    genre: 'Cozy Fantasy',
    tags: ['Public Domain', 'Cozy Life', 'Pastoral', 'Friendship', 'Riverbank', 'Classic'],
    totalChapters: 12,
    rating: 5,
    readsCount: 5480,
    isPublicDomain: true,
    chapters: [
      {
        id: 'ww-ch1',
        chapterNumber: 1,
        title: 'The River Bank',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'Mole abandons spring-cleaning and meets the Water Rat.',
        content: [
          'The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash; till he had dust in his throat and eyes, and splashes of whitewash all over his black fur.',
          'Spring was moving in the air above and in the earth below and around him, penetrating even his dark and lowly little house with its spirit of divine discontent and longing.',
          'It was small wonder, then, that he suddenly flung down his brush on the floor, said "Bother!" and "O blow!" and also "Hang spring-cleaning!" and bolted out of the house.',
          'He scuffled up a steep little tunnel, popped into the sunlight, and found himself standing on the bank of a great, shimmering, living river.',
          'Across the water, from a hole in the bank, peered a brown face with whiskers and twinkling eyes: the Water Rat!'
        ]
      },
      {
        id: 'ww-ch2',
        chapterNumber: 2,
        title: 'The Open Road',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1908',
        authorNote: 'Ratty and Mole visit Toad Hall and join Toad’s yellow caravan.',
        content: [
          '"Believe me, my young friend," said the Water Rat solemnly, "there is nothing—absolutely nothing—half so much worth doing as simply messing about in boats."',
          'They rowed up-river to Toad Hall, an ancient, handsome Elizabethan manor with Tudor chimneys and velvety lawns.',
          'Mr. Toad welcomed them with extravagant gestures. He had abandoned boats forever and bought a brand-new, canary-yellow gypsy caravan with green wheels.',
          '"The open road!" cried Toad, waving his arms. "Here today, in next week tomorrow! The poetry of motion!"',
          'They set out on the highway until a roaring motor-car passed them with a blinding cloud of dust: "Poop-poop!" The caravan landed in a ditch, and Toad sat in the road in a state of hypnotic ecstasy, completely bewitched by motor-cars.'
        ]
      },
      {
        id: 'ww-ch3',
        chapterNumber: 3,
        title: 'The Wild Wood',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'Mole ventures alone into the menacing winter forest.',
        content: [
          'The Mole had long wanted to make the acquaintance of Badger, but Ratty warned him that Badger lived deep in the Wild Wood and hated society.',
          'One snowy winter afternoon, Mole slipped out alone into the leafless forest.',
          'The wood was cold and silent. From every hollow tree, evil little faces peered out at him with wicked, glittering eyes. Twigs cracked like pistol shots, and terror seized him.',
          'He ran blindly, tripping over brambles, until he crawled into the hollow trunk of an ancient beech tree, panting with fright.',
          'Ratty followed his tracks through the snow, carrying a sturdy cudgel, and found his trembling friend.'
        ]
      },
      {
        id: 'ww-ch4',
        chapterNumber: 4,
        title: 'Mr. Badger',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1908',
        authorNote: 'Finding sanctuary and a roaring hearth in Badger’s underground fortress.',
        content: [
          'While wading through the snowdrifts, Mole scraped his shin painfully on a hard piece of iron.',
          'They dug through the snow and discovered an iron scraper, then a door-mat, and finally a sturdy green wooden door with a brass knocker: "MR. BADGER."',
          'Badger opened the door in his dressing-gown and slippers. Seeing the shivering animals, he drew them into a huge kitchen with stone-flagged floors and a roaring wood fire.',
          'Hams and bundles of dried herbs hung from the rafters; plates of hot buttered toast and steaming bowls of savory stew were brought to the table.',
          'Mole had never felt so safe, so warm, and so entirely at home.'
        ]
      },
      {
        id: 'ww-ch5',
        chapterNumber: 5,
        title: 'Dulce Domum',
        wordCount: 940,
        readTimeMinutes: 5,
        publishedDate: '1908',
        authorNote: 'Mole smells his old underground home and weeps for it in the dark.',
        content: [
          'Returning from Badger’s home in the twilight, Mole was suddenly struck by a subtle, magical electric current in the air.',
          'It was the scent of his own little home—Mole End—calling to him across the snowy fields!',
          'Overcome with homesickness, Mole broke down in the dark and sobbed into his paws.',
          'Ratty, the truest friend who ever lived, stopped immediately, turned back, and searched through the hedge until they found Mole’s modest little doorway.',
          'Ratty built a fire, lit the tallow candles, and when field-mouse carollers arrived outside singing Christmas carols in thin sweet voices, Ratty bought hot cider and buns to feast the whole company.'
        ]
      },
      {
        id: 'ww-ch6',
        chapterNumber: 6,
        title: 'Mr. Toad’s Folly',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'Badger, Rat, and Mole try to save Toad from his obsession.',
        content: [
          'Badger declared that the hour had arrived to deal firmly with Toad.',
          'Toad had smashed seven expensive motor-cars, paid countless fines, and brought shame upon his father’s honored name.',
          'The three friends placed Toad under house arrest in his own bedroom, taking turns guarding the door.',
          'Toad feigned illness, tricked Ratty into running for the doctor, climbed out the bedroom window down a water-pipe, and made a dash for freedom.'
        ]
      },
      {
        id: 'ww-ch7',
        chapterNumber: 7,
        title: 'The Piper at the Gates of Dawn',
        wordCount: 960,
        readTimeMinutes: 5,
        publishedDate: '1908',
        authorNote: 'The transcendent mystical vision of Pan on the river at sunrise.',
        content: [
          'Otter’s little son Portly was missing, and the River was silent with grief.',
          'Rat and Mole rowed through the purple summer night, searching the reeds and willows.',
          'As the dawn wind stirred, a strange, sweet, unearthly piping music drifted across the water—music so holy and rapturous that tears ran down Ratty’s cheeks.',
          'They steered into a sunlit backwater island. There, in a clearing of wild roses, stood the Great God Pan himself, horns curved and pipes in hand, holding the sleeping baby otter gently between his hooves.',
          'Pan touched their foreheads with divine forgetfulness, so that only the peace of the vision remained in their grateful hearts.'
        ]
      },
      {
        id: 'ww-ch8',
        chapterNumber: 8,
        title: 'Toad’s Adventures and Prison Break',
        wordCount: 900,
        readTimeMinutes: 5,
        publishedDate: '1865',
        authorNote: 'Toad steals a motor-car and is thrown into the deepest dungeon.',
        content: [
          'At the Red Lion inn, Toad saw a sleek motor-car left unattended in the courtyard.',
          'The madness seized him: he jumped into the driver’s seat and tore down the road at sixty miles an hour until the police caught him.',
          'The judge sentenced him to twenty years in the darkest dungeon of the stoutest castle in all England.',
          'The gaoler’s kind-hearted daughter took pity on Toad and helped him escape disguised as an old washerwoman in a cotton bonnet and apron.'
        ]
      },
      {
        id: 'ww-ch9',
        chapterNumber: 9,
        title: 'Wayfarers All',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'Ratty meets the Sea Rat and hears the siren song of southern ports.',
        content: [
          'The autumn wind blew gold leaves across the water, and birds gathered in flocks for migration.',
          'Ratty met a sun-browned Sea Rat on the road, who told tales of Sicilian harbors, olive groves, and blue Mediterranean waters.',
          'Ratty fell into a waking trance, packed his knapsack, and was walking out the door toward the sea when Mole grabbed him and wrestled him to the floor.',
          'Mole gave him a pencil and paper, and Ratty poured his restless yearning into poetry until the fever passed.'
        ]
      },
      {
        id: 'ww-ch10',
        chapterNumber: 10,
        title: 'The Further Adventures of Toad',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1908',
        authorNote: 'Toad outwits a barge-woman, steals a horse, and meets Ratty.',
        content: [
          'Still disguised as a washerwoman, Toad was tossed off a canal boat when he failed to wash the barge-woman’s shirts.',
          'He stole her fat horse, sold it to a gypsy for six shillings and a plate of sausages, and was chased across country by the motor-car owners.',
          'He plunged into the river and was hauled out by the scruff of his neck by his faithful friend the Water Rat.',
          '"Bad news, Toad," Ratty said gravely. "Toad Hall has been captured by the Weasels and Stoats of the Wild Wood!"'
        ]
      },
      {
        id: 'ww-ch11',
        chapterNumber: 11,
        title: 'Like Summer Tempests Came His Tears',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'Badger reveals the secret underground passage beneath Toad Hall.',
        content: [
          'Toad Hall was garrisoned by thirty ferrets and forty stoats armed with blunderbusses and cutlasses.',
          'Toad wept buckets of tears, but Badger pulled out a secret map.',
          '"Your late father, Toad, was a wise animal," Badger revealed. "He built a secret underground tunnel leading from the riverbank straight into the butler’s pantry of Toad Hall!"',
          'The four friends armed themselves with pistols, cutlasses, and stout cudgels for the decisive battle.'
        ]
      },
      {
        id: 'ww-ch12',
        chapterNumber: 12,
        title: 'The Return of Ulysses',
        wordCount: 930,
        readTimeMinutes: 5,
        publishedDate: '1908',
        authorNote: 'The assault on the banqueting hall and the restoration of peace.',
        content: [
          'In the dead of night, while the weasels feasted and sang disrespectful songs about Toad, the pantry door burst open!',
          'Badger swung his cudgel like a threshing-flail; Mole whirled his sword; Ratty bristled with cutlasses; and Toad leapt into the room with a terrifying war-whoop.',
          'The terrified weasels squeaked and dived out the windows into the river, while the stoats dropped their weapons and fled into the dark.',
          'Toad Hall was saved! A grand banquet was given, where Toad—reformed and modest at last—politely poured tea and refused to sing conceited songs about himself.',
          'In the summer twilights that followed, mother weasels would point out the four great animal friends walking arm-in-arm along the riverbank.'
        ]
      }
    ]
  },

  {
    id: 'the-wonderful-wizard-of-oz',
    slug: 'the-wonderful-wizard-of-oz',
    title: 'The Wonderful Wizard of Oz',
    synopsis: 'L. Frank Baum’s quintessential American fairy tale. A cyclone sweeps Dorothy and her little dog Toto from the gray prairies of Kansas into the colorful, magical Land of Oz, seeking the Emerald City alongside the Scarecrow, Tin Woodman, and Cowardly Lion.',
    author: 'L. Frank Baum',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    coverAlt: 'A glowing golden road winding through an enchanted green forest toward an emerald city.',
    status: 'Completed',
    genre: 'Cozy Fantasy',
    tags: ['Public Domain', 'Fantasy', 'Yellow Brick Road', 'Friendship', 'Classic'],
    totalChapters: 12,
    rating: 5,
    readsCount: 5820,
    isPublicDomain: true,
    chapters: [
      {
        id: 'oz-ch1',
        chapterNumber: 1,
        title: 'The Cyclone',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1900',
        authorNote: 'Dorothy’s farmhouse is lifted into the sky by a Kansas tornado.',
        content: [
          'Dorothy lived in the midst of the great Kansas prairies, with Uncle Henry, who was a farmer, and Aunt Em, who was the farmer’s wife.',
          'Their house was small, for the lumber to build it had to be carried by wagon many miles. The sun had baked the plowed land into a gray mass, with little cracks running through it; even the grass was not green, for the sun had burned the tops of the long blades, until they were the same gray color to be seen everywhere.',
          'Suddenly Uncle Henry stood up and looked into the sky: a great whirlwind came shrieking from the north and south at once!',
          'Dorothy caught Toto in her arms and ran for the trap door. Before she could reach it, the house whirled around two or three times and rose slowly through the air like a balloon.'
        ]
      },
      {
        id: 'oz-ch2',
        chapterNumber: 2,
        title: 'The Council with the Munchkins',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1900',
        authorNote: 'The house lands in Oz and crushes the Wicked Witch of the East.',
        content: [
          'She was awakened by a shock, so sudden and severe that if Dorothy had not been lying on the soft bed she might have been hurt.',
          'She opened the door and gave a cry of delightful wonder.',
          'The cyclone had set the house down very gently in the midst of a country of marvelous beauty. There were lovely patches of greensward all about, with stately trees bearing rich and luscious fruits. Banks of gorgeous flowers were on every hand, and birds with rare and brilliant plumage sang and fluttered in the trees and bushes.',
          'Four queerly dressed little people in round blue hats approached her, accompanied by the sweet Good Witch of the North.',
          'The house had landed directly on the Wicked Witch of the East, freeing the Munchkins! Dorothy was presented with the magical Silver Shoes.'
        ]
      },
      {
        id: 'oz-ch3',
        chapterNumber: 3,
        title: 'How Dorothy Saved the Scarecrow',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1900',
        authorNote: 'Meeting the Scarecrow on the Yellow Brick Road.',
        content: [
          'Dorothy washed herself carefully, dressed in a clean blue and white gingham dress, and set out along the road of yellow brick.',
          'Walking past a cornfield, she saw a Scarecrow perched high on a pole to keep birds away.',
          'One of the eyes winked at her! Dorothy stopped in astonishment. The Scarecrow nodded, and said, "Good day."',
          '"Did you speak?" asked the girl in wonder.',
          '"Certainly," answered the Scarecrow. "Would you mind helping me down from this pole?"',
          'Dorothy unpinned him. "My head is stuffed with straw," he confided mournfully, "so I have no brains at all! Do you think the Great Wizard of Oz would give me brains if I went with you?"',
          '"I’m sure he would," said Dorothy gladly. "Come along!"'
        ]
      },
      {
        id: 'oz-ch4',
        chapterNumber: 4,
        title: 'The Rescue of the Tin Woodman',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1900',
        authorNote: 'Oiling the rusted woodsman in the deep forest.',
        content: [
          'As they walked through the thick forest, a deep groan echoed from behind a great oak tree.',
          'Dorothy ran forward and found a man made entirely of tin, holding an axe poised in the air, completely rusted and unable to move.',
          '"Oil-can," whispered the tin jaws faintly.',
          'Dorothy fetched the oil-can from his cottage, oiled his jaw, his neck, and his arms until he could swing his axe with ease.',
          '"I have no heart," the Tin Woodman told them, touching his hollow chest. "Once I loved a Munchkin girl, but an enchanted axe chopped off my limbs and the tinsmith replaced them with tin. If the Wizard could give me a heart, I would be the happiest man alive."'
        ]
      },
      {
        id: 'oz-ch5',
        chapterNumber: 5,
        title: 'The Cowardly Lion',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1900',
        authorNote: 'Toto defends Dorothy, and the ferocious beast confesses his fear.',
        content: [
          'A terrible roar shook the forest, and a gigantic lion sprang into the road, knocking the Scarecrow spinning with a blow of his paw.',
          'Toto ran at him barking fiercely.',
          'The Lion opened his huge mouth to bite the little dog, but Dorothy rushed forward and slapped the Lion on his nose with all her might!',
          '"Don’t you dare bite Toto!" she scolded angrily. "You ought to be ashamed of yourself, a big beast like you, to bite a poor little dog!"',
          '"I didn’t bite him," said the Lion, rubbing his nose. "I’m just a coward. Whenever there is danger, my heart begins to beat fast and I want to run away. If the Wizard could give me courage, I would roar like a true King."'
        ]
      },
      {
        id: 'oz-ch6',
        chapterNumber: 6,
        title: 'The Kalidahs and the Chasm',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1900',
        authorNote: 'The friends cross a deep gorge and outwit the ferocious bear-tigers.',
        content: [
          'A vast chasm cut across the Yellow Brick Road, too wide to jump and too deep to climb.',
          'The Scarecrow thought of a plan: the Tin Woodman chopped down a great pine tree that spanned the chasm like a bridge.',
          'As they crossed, monstrous Kalidahs—beasts with bodies like bears and heads like tigers—roared at their heels.',
          'The Scarecrow ordered the Woodman to chop through the bridge tree. It crashed into the abyss with a roar, carrying the monsters to their doom.'
        ]
      },
      {
        id: 'oz-ch7',
        chapterNumber: 7,
        title: 'The Deadly Poppy Field',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1900',
        authorNote: 'The crimson flowers induce an enchanted sleep upon living creatures.',
        content: [
          'They came upon a vast carpet of scarlet poppies, whose heavy fragrance induced instant, fatal slumber.',
          'Dorothy and Toto grew dizzy and fell fast asleep among the blossoms. The Cowardly Lion ran with all his might, but collapsed near the far edge of the field.',
          'Because the Scarecrow and Tin Woodman were not made of flesh, the scent had no effect on them.',
          'They carried Dorothy and Toto to safety, then rescued the Queen of the Field Mice from a wildcat.',
          'In gratitude, thousands of field mice were harnessed with strings to a wooden truck, pulling the heavy Lion safely out of the enchanted poppies.'
        ]
      },
      {
        id: 'oz-ch8',
        chapterNumber: 8,
        title: 'The Guardian of the Gate',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1900',
        authorNote: 'Putting on green spectacles to enter the Emerald City.',
        content: [
          'The green glow in the sky grew brighter, and at last they stood before the glittering emerald walls of the great capital.',
          'The Guardian of the Gate locked green spectacles onto their faces with a little golden key.',
          '"If you did not wear spectacles, the brightness and glory of the Emerald City would blind you," he explained.',
          'Even the sky seemed tinted with green, and the sun’s rays were green as emeralds as they walked into the dazzling streets.'
        ]
      },
      {
        id: 'oz-ch9',
        chapterNumber: 9,
        title: 'The Wonderful City of Oz',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1900',
        authorNote: 'Audience with the Great and Terrible Oz in his throne room.',
        content: [
          'The throne room was lined with large emeralds. In the center sat the Wizard, appearing to Dorothy as an enormous Head without a body.',
          '"I am Oz, the Great and Terrible," boomed the voice. "Who are you, and why do you seek me?"',
          'Dorothy asked to be sent home to Kansas.',
          '"I will grant your wish on one condition," said the Head. "You must destroy the Wicked Witch of the West, who tyrannizes the country of the Winkies!"',
          'The four friends left the palace heavy-hearted, for they knew not how to conquer an evil sorceress.'
        ]
      },
      {
        id: 'oz-ch10',
        chapterNumber: 10,
        title: 'The Winged Monkeys and the Golden Cap',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1900',
        authorNote: 'The Wicked Witch sends her enchanted flying primates.',
        content: [
          'The Wicked Witch of the West had one eye, but it was as powerful as a telescope.',
          'She summoned the Winged Monkeys with the Golden Cap. They flew down like a storm, tearing the Scarecrow’s straw out and dropping the Tin Woodman onto sharp rocks.',
          'Because Dorothy wore the Silver Shoes and the Good Witch’s mark upon her forehead, the Monkeys could not harm her.',
          'They carried her and Toto to the Witch’s castle, where she was set to scrub pots and clean the kitchen.'
        ]
      },
      {
        id: 'oz-ch11',
        chapterNumber: 11,
        title: 'The Bucket of Water',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1900',
        authorNote: 'The Wicked Witch melts away forever.',
        content: [
          'The Witch tricked Dorothy into tripping so she could steal one of the Silver Shoes.',
          'Dorothy was so furious at this cruelty that she seized a bucket of water that stood near and threw it over the Witch from head to foot.',
          'The Witch gave a loud shriek of terror: "See what you’ve done!" she screamed. "In a minute I shall melt away!"',
          '"Didn’t you know water would be the end of me?"',
          'The evil old woman melted down before Dorothy’s eyes like brown sugar, leaving only the Silver Shoe and a shapeless wet puddle on the stone floor.',
          'The friendly Winkie tinsmiths repaired the Tin Woodman and restuffed the Scarecrow with clean straw.'
        ]
      },
      {
        id: 'oz-ch12',
        chapterNumber: 12,
        title: 'There is No Place Like Home',
        wordCount: 920,
        readTimeMinutes: 5,
        publishedDate: '1900',
        authorNote: 'Clicking the silver heels and returning to Kansas.',
        content: [
          'Back in the Emerald City, Toto tipped over a screen, revealing that the great Wizard was merely a little bald-headed humbug from Omaha!',
          'Yet the humbug gave the Scarecrow brains of bran and needles, the Woodman a heart of silk and sawdust, and the Lion a potion of courage.',
          'Glinda, the Good Witch of the South, revealed the final secret to Dorothy:',
          '"Your Silver Shoes have the power to carry you across any desert in three steps. Knock the heels together three times and say where you wish to go."',
          'Dorothy hugged her three faithful friends with tears of love, clapped her heels together, and cried: "Take me home to Aunt Em!"',
          'In a flash she was rolling over the green prairie grass, right into Aunt Em’s loving arms in front of the new Kansas farmhouse.'
        ]
      }
    ]
  },

  {
    id: 'peter-pan',
    slug: 'peter-and-wendy',
    title: 'Peter and Wendy',
    synopsis: 'J.M. Barrie’s timeless myth of eternal youth, fairies, and pirates. Peter Pan flies through the Darling nursery window and whisks Wendy, John, and Michael away to the magical shores of Neverland.',
    author: 'J.M. Barrie',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',
    coverAlt: 'A starry night sky with fairy dust twinkling over ocean waves.',
    status: 'Completed',
    genre: 'Cozy Fantasy',
    tags: ['Public Domain', 'Neverland', 'Fairies', 'Adventure', 'Classic'],
    totalChapters: 11,
    rating: 5,
    readsCount: 5290,
    isPublicDomain: true,
    chapters: [
      {
        id: 'pp-ch1',
        chapterNumber: 1,
        title: 'Peter Breaks Through',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'All children, except one, grow up.',
        content: [
          'All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she was playing in a garden, and she plucked another flower and ran with it to her mother.',
          'Mrs. Darling put her hand to her heart and cried, "Oh, why can’t you remain like this for ever!" That was all that passed between them on the subject, but henceforth Wendy knew that she must grow up.',
          'You always know after you are two. Two is the beginning of the end.',
          'In the night nursery of the Darling house, Nana the Newfoundland dog watched over the children with spotless nursery tidiness.'
        ]
      },
      {
        id: 'pp-ch2',
        chapterNumber: 2,
        title: 'The Shadow',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'Mrs. Darling rolls up Peter’s shadow and locks it in the drawer.',
        content: [
          'Mrs. Darling found Peter’s shadow lying on the nursery floor when Nana snapped at the flying boy as he leapt out the window.',
          'She rolled it up like a dark silk stocking and put it away neatly in the drawer.',
          'On a Friday night, while Mr. and Mrs. Darling were away at a dinner party, the nursery window flew open and a tiny golden light entered: Tinker Bell, the fairy.',
          'Behind her leapt Peter Pan, weeping bitter tears because his shadow wouldn’t stick to his heels with bathroom soap.'
        ]
      },
      {
        id: 'pp-ch3',
        chapterNumber: 3,
        title: 'Come Away, Come Away!',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'Wendy sews on Peter’s shadow, and he teaches them to fly.',
        content: [
          'Wendy woke and saw him weeping. She fetched her sewing basket and stitched his shadow neatly to his boots.',
          'Peter crowed with joy. "Wendy, one girl is more use than twenty boys!" he declared.',
          'He begged her to come to Neverland to tell stories to the Lost Boys and mend their pockets.',
          'He blew fairy dust over Wendy, John, and Michael. "Think lovely thoughts!" he commanded.',
          'Up into the air they floated, skimming around the ceiling like swallows, and out the open window into the starry London night: "Second to the right, and then straight on till morning!"'
        ]
      },
      {
        id: 'pp-ch4',
        chapterNumber: 4,
        title: 'The Flight to Neverland',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'Flying across oceans and clouds to the magical island.',
        content: [
          'They flew for days over purple seas and coral reefs, sleeping in the air when Peter was there to catch them.',
          'At last Neverland appeared below them like a map come alive: smoking pirate ships in the lagoon, red men around their campfires, and caves under ancient oak trees.',
          'Tinker Bell, jealous of Wendy, flew ahead and tricked the Lost Boy Tootles into shooting an arrow at the "great white Wendy-bird."',
          'Wendy fell to earth, but the arrow struck the acorn button Peter had given her, saving her life.'
        ]
      },
      {
        id: 'pp-ch5',
        chapterNumber: 5,
        title: 'The Island Come True',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'The Lost Boys build the Little House for Wendy.',
        content: [
          'The Lost Boys—Slightly, Nibs, Tootles, Curly, and the Twins—gathered around Wendy with sorrow and awe.',
          'Peter ordered them to build a house around her where she lay.',
          'They made walls of branches, a roof of moss, and red chimney pots from John’s top hat.',
          'When Wendy opened the little green front door, the Lost Boys fell to their knees: "Oh Wendy lady, be our mother!"'
        ]
      },
      {
        id: 'pp-ch6',
        chapterNumber: 6,
        title: 'The Home Under the Ground',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'Daily domestic life inside the hollow-tree haven.',
        content: [
          'The home under the ground was entered through hollow tree trunks, hollowed out to fit each boy’s measurements.',
          'There was a great fireplace where Tink had a little private bedroom the size of a birdcage, hung with peach blossoms.',
          'Wendy cooked invisible meals, darned endless wool socks, and told bedtime stories every evening by the fire.',
          'Peter was the father, coming home with tales of battles against pirates and redskins.'
        ]
      },
      {
        id: 'pp-ch7',
        chapterNumber: 7,
        title: 'The Mermaids’ Lagoon',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1911',
        authorNote: 'The battle at Marooners’ Rock and the rescue of Tiger Lily.',
        content: [
          'In the lagoon, mermaids combed their golden hair on the rocks in the summer heat.',
          'Peter imitated Captain Hook’s voice from the mist, tricking the pirate boat into releasing Tiger Lily, the Indian princess.',
          'Hook swam to the rock, and a fierce duel with iron hook and dagger ensued.',
          'The tide rose, threatening to drown the marooned Peter. He stood on the rock watching the dark water creep to his feet, smiling his brave, carefree smile:',
          '"To die will be an awfully big adventure."'
        ]
      },
      {
        id: 'pp-ch8',
        chapterNumber: 8,
        title: 'The Never Bird',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'A brave mother bird lends Peter her floating nest.',
        content: [
          'Just as the water reached Peter’s neck, a large Never bird floated by, sitting proudly on her eggs in a watertight nest.',
          'She pushed the nest toward Peter with her wings.',
          'Peter scrambled into the nest, stuck Wendy’s staved-in hat on as a sail, and sailed safely across the lagoon back to the shore.'
        ]
      },
      {
        id: 'pp-ch9',
        chapterNumber: 9,
        title: 'The Children Are Carried Off',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1911',
        authorNote: 'Hook ambushes the camp and captures Wendy and the boys.',
        content: [
          'Wendy decided it was time to take John and Michael home to London.',
          'As the children stepped out of the hollow trees, Captain Hook and his buccaneers leapt from the shadows, gagging the boys and chaining them.',
          'Hook crept down Peter’s tree while he slept and poured five drops of deadly poison into Peter’s medicine glass.',
          'Tinker Bell flew in, drank the poison to save Peter, and her light began to flicker and die.',
          'Peter turned to all the dreaming children of the world: "If you believe in fairies, clap your hands! Don’t let Tink die!" A wave of clapping roared across the world, and Tink’s light blazed brilliant and bright.'
        ]
      },
      {
        id: 'pp-ch10',
        chapterNumber: 10,
        title: 'The Pirate Ship and the Plank',
        wordCount: 920,
        readTimeMinutes: 5,
        publishedDate: '1911',
        authorNote: 'Peter boards the Jolly Roger and confronts Captain Hook.',
        content: [
          'On the deck of the Jolly Roger, Hook prepared to make the boys walk the plank.',
          'Suddenly, from the water below, came a sound that made Hook’s blood run cold: "Tick-tick-tick-tick!"',
          'It was Peter Pan, imitating the crocodile!',
          'Peter leapt aboard, cut the boys’ ropes, and faced the pirate captain with his glittering rapier.',
          'Hook fought like a demon, but Peter’s youth and speed drove him to the ship’s rail.',
          'Below, the crocodile waited with jaws wide open. Hook stepped off the bulwarks into the sea, right into the jaws of his fate.'
        ]
      },
      {
        id: 'pp-ch11',
        chapterNumber: 11,
        title: 'The Open Window and the Nursery',
        wordCount: 940,
        readTimeMinutes: 5,
        publishedDate: '1911',
        authorNote: 'Wendy, John, and Michael fly home into their mother’s arms.',
        content: [
          'Peter sailed the Jolly Roger back to London.',
          'In the nursery, Mrs. Darling sat by the open window, her eyes wet with tears, playing the piano softly.',
          'Three little figures flew through the window and crept into their beds under the sheets.',
          'When Mrs. Darling turned, she thought it was another dream—until three pairs of arms wrapped around her neck, shouting with joy!',
          'The Lost Boys were all adopted into the Darling family.',
          'Only Peter flew back to Neverland, crowned with leaves, playing his pan-pipes forever in the golden land of eternal youth.'
        ]
      }
    ]
  },

  {
    id: 'grimms-fairy-tales',
    slug: 'grimms-fairy-tales',
    title: "Grimm's Fairy Tales",
    synopsis: 'Jacob and Wilhelm Grimm’s foundational treasury of folklore and wonder. Enchanted forests, talking beasts, golden geese, and resilient heroes in twelve of the most beloved traditional European tales.',
    author: 'Jacob & Wilhelm Grimm',
    authorRole: 'Classic Public Domain Authors',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    coverAlt: 'An enchanted fairy tale cottage surrounded by glowing lantern-lit woodland trees.',
    status: 'Completed',
    genre: 'Cozy Fantasy',
    tags: ['Public Domain', 'Fairy Tales', 'Folklore', 'Enchanted Forest', 'Classic'],
    totalChapters: 12,
    rating: 5,
    readsCount: 5610,
    isPublicDomain: true,
    chapters: [
      { id: 'gft-ch1', chapterNumber: 1, title: 'The Golden Goose', wordCount: 830, readTimeMinutes: 4, publishedDate: '1812', content: ['Simpleton shared his dry ash-cake with an old gray dwarf in the forest, and was rewarded with a goose with feathers of pure gold. Everyone who tried to pluck a feather got stuck fast to the goose and each other, creating a hilarious parade that made the princess laugh for the first time in her life.'] },
      { id: 'gft-ch2', chapterNumber: 2, title: 'The Elves and the Shoemaker', wordCount: 820, readTimeMinutes: 4, publishedDate: '1812', content: ['An honest shoemaker down to his last scrap of leather awoke to find exquisitely stitched shoes on his workbench. Little naked elves had secretly worked by moonlight, and when the shoemaker and his wife made them little coats and shoes of warm wool, the elves danced away in delight.'] },
      { id: 'gft-ch3', chapterNumber: 3, title: 'The Bremen Town Musicians', wordCount: 850, readTimeMinutes: 4, publishedDate: '1812', content: ['An aging donkey, hound, cat, and rooster ran away from their masters to become musicians in Bremen. Finding a robber’s cottage in the dark woods, they climbed upon each other’s backs and let out an unearthly musical bray, hiss, and crow that sent the thieves fleeing in terror.'] },
      { id: 'gft-ch4', chapterNumber: 4, title: 'Hansel and Gretel', wordCount: 870, readTimeMinutes: 4, publishedDate: '1812', content: ['Left in the great forest, the clever siblings followed a trail of white pebbles shining in the moonlight. Later, guided by a snow-white bird, they discovered a cottage made of gingerbread, sugar windows, and cake roof.'] },
      { id: 'gft-ch5', chapterNumber: 5, title: 'Rapunzel', wordCount: 840, readTimeMinutes: 4, publishedDate: '1812', content: ['In a high stone tower in the forest without stairs or door, Rapunzel let down her golden hair like twenty yards of spun silk when the voice called: "Rapunzel, Rapunzel, let down your hair to me!"'] },
      { id: 'gft-ch6', chapterNumber: 6, title: 'Snow White and the Seven Dwarfs', wordCount: 890, readTimeMinutes: 5, publishedDate: '1812', content: ['Over the seven hills lived seven dwarfs who mined copper and gold in the mountains. Snow White kept their little cottage spotless, while the Magic Mirror on the wall continually declared her the fairest in all the land.'] },
      { id: 'gft-ch7', chapterNumber: 7, title: 'The Frog Prince', wordCount: 810, readTimeMinutes: 4, publishedDate: '1812', content: ['When the king’s youngest daughter dropped her golden ball into the deep forest well, a frog offered to retrieve it on condition that she allow him to sit beside her plate and sleep on her silk pillow.'] },
      { id: 'gft-ch8', chapterNumber: 8, title: 'Rumpelstiltskin', wordCount: 850, readTimeMinutes: 4, publishedDate: '1812', content: ['A little man danced around a midnight fire singing: "Today I bake, tomorrow I brew, the next day I bring the queen’s child away; for no one knows my name is Rumpelstiltskin!"'] },
      { id: 'gft-ch9', chapterNumber: 9, title: 'The Fisherman and His Wife', wordCount: 860, readTimeMinutes: 4, publishedDate: '1812', content: ['The golden flounder granted every wish of the greedy wife from a pig-sty to a stone castle, to a palace, until she demanded to command the sun and moon, and found herself back in her old dirty hovel.'] },
      { id: 'gft-ch10', chapterNumber: 10, title: 'Sleeping Beauty (Briar Rose)', wordCount: 840, readTimeMinutes: 4, publishedDate: '1812', content: ['For a hundred years the palace slept under a dense wall of blooming wild roses, until the destined prince arrived and the thorns turned into fragrant petals that parted of their own accord.'] },
      { id: 'gft-ch11', chapterNumber: 11, title: 'Cinderella (Aschenputtel)', wordCount: 880, readTimeMinutes: 4, publishedDate: '1812', content: ['Cinderella planted a hazel twig on her mother’s grave and watered it with her tears. A white bird nested in the tree and dropped down dresses of silver and gold and silk slippers for the three-day ball.'] },
      { id: 'gft-ch12', chapterNumber: 12, title: 'The Twelve Dancing Princesses', wordCount: 860, readTimeMinutes: 4, publishedDate: '1812', content: ['Every morning the twelve princesses’ satin slippers were found worn into holes from dancing all night in a subterranean castle of diamond, silver, and gold trees across an enchanted lake.'] }
    ]
  },

  {
    id: 'the-blue-fairy-book',
    slug: 'the-blue-fairy-book',
    title: 'The Blue Fairy Book',
    synopsis: 'Andrew Lang’s world-renowned Victorian anthology of classic fairy tales. Featuring timeless renditions of Beauty and the Beast, Aladdin, Cinderella, and magical world lore in twelve wondrous chapters.',
    author: 'Andrew Lang',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
    coverAlt: 'An ornate blue vintage cloth-bound fairy tale book.',
    status: 'Completed',
    genre: 'Cozy Fantasy',
    tags: ['Public Domain', 'Fairy Tales', 'Mythology', 'Victorian', 'Classic'],
    totalChapters: 12,
    rating: 5,
    readsCount: 4910,
    isPublicDomain: true,
    chapters: [
      { id: 'bfb-ch1', chapterNumber: 1, title: 'Beauty and the Beast', wordCount: 880, readTimeMinutes: 4, publishedDate: '1889', content: ['Beauty asked her father only for a single red rose, which led him into the Beast’s palace. Beauty’s gentleness discovered the noble, wounded prince beneath the terrifying exterior.'] },
      { id: 'bfb-ch2', chapterNumber: 2, title: 'The Bronze Ring', wordCount: 850, readTimeMinutes: 4, publishedDate: '1889', content: ['A magical bronze ring, guarded by a faithful dog and cat, grants every wish to the humble gardener’s son in the royal palace.'] },
      { id: 'bfb-ch3', chapterNumber: 3, title: 'The Princess on the Glass Hill', wordCount: 840, readTimeMinutes: 4, publishedDate: '1889', content: ['Boots, the youngest son whom everyone despised as an ash-sitter, caught three magical horses of copper, silver, and gold, and rode straight up the glass mountain to catch the golden apples.'] },
      { id: 'bfb-ch4', chapterNumber: 4, title: 'East of the Sun and West of the Moon', wordCount: 890, readTimeMinutes: 5, publishedDate: '1889', content: ['A peasant girl rode on the back of a great white bear to an enchanted palace, journeying to the ends of the earth with the Four Winds to free the prince from the troll hag.'] },
      { id: 'bfb-ch5', chapterNumber: 5, title: 'The Master Cat; or, Puss in Boots', wordCount: 830, readTimeMinutes: 4, publishedDate: '1889', content: ['Armed with a pair of boots and a bag, the clever cat made his master the Marquis of Carabas, outwitting the fierce ogre by tricking him into turning into a mouse.'] },
      { id: 'bfb-ch6', chapterNumber: 6, title: 'Aladdin and the Wonderful Lamp', wordCount: 910, readTimeMinutes: 5, publishedDate: '1889', content: ['In the subterranean garden of jewel-bearing trees, Aladdin retrieved the brass oil lamp containing the colossal Genie of the Earth.'] },
      { id: 'bfb-ch7', chapterNumber: 7, title: 'The White Cat', wordCount: 860, readTimeMinutes: 4, publishedDate: '1889', content: ['The youngest prince found a palace populated entirely by cats dressed in armor, where the lovely White Queen ruled in enchanted grace.'] },
      { id: 'bfb-ch8', chapterNumber: 8, title: 'The Goose-Girl', wordCount: 840, readTimeMinutes: 4, publishedDate: '1889', content: ['The true princess was forced by her wicked maid to herd geese, accompanied by the faithful talking horse Falada who spoke the truth from the city gate.'] },
      { id: 'bfb-ch9', chapterNumber: 9, title: 'Prince Darling', wordCount: 830, readTimeMinutes: 4, publishedDate: '1889', content: ['A fairy presented Prince Darling with a magical ring that pricked his finger whenever he had an unjust or selfish thought.'] },
      { id: 'bfb-ch10', chapterNumber: 10, title: 'The History of Whittington', wordCount: 850, readTimeMinutes: 4, publishedDate: '1889', content: ['Poor Dick Whittington listened to the bells of Bow Church ring out: "Turn again, Whittington, thrice Lord Mayor of London!" while his faithful mousing cat made his fortune abroad.'] },
      { id: 'bfb-ch11', chapterNumber: 11, title: 'The Yellow Dwarf', wordCount: 870, readTimeMinutes: 4, publishedDate: '1889', content: ['The courageous quest of the Mermaid and the King of the Gold Mines against the sorcery of the Yellow Dwarf.'] },
      { id: 'bfb-ch12', chapterNumber: 12, title: 'The Red Etin', wordCount: 820, readTimeMinutes: 4, publishedDate: '1889', content: ['A Scottish tale of three brothers, a singing bird, and solving the riddles of the three-headed giant Red Etin.'] }
    ]
  },

  {
    id: 'the-princess-and-the-goblin',
    slug: 'the-princess-and-the-goblin',
    title: 'The Princess and the Goblin',
    synopsis: 'George MacDonald’s wondrous fairy-tale romance. Eight-year-old Princess Irene discovers a mysterious Great-Great-Grandmother spinning invisible thread in a hidden tower, while the brave miner boy Curdie battles goblin conspiracies beneath the mountain.',
    author: 'George MacDonald',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    coverAlt: 'A spinning wheel glowing with silvery thread in a hidden tower.',
    status: 'Completed',
    genre: 'Cozy Fantasy',
    tags: ['Public Domain', 'Fantasy', 'Goblins', 'Magic Thread', 'Classic'],
    totalChapters: 10,
    rating: 5,
    readsCount: 4120,
    isPublicDomain: true,
    chapters: [
      { id: 'pg-ch1', chapterNumber: 1, title: 'The Princess and the Mountain Farm', wordCount: 840, readTimeMinutes: 4, publishedDate: '1872', content: ['Princess Irene lived in a large half-castle, half-farmhouse halfway up a great mountain. Deep inside the subterranean caverns lived the goblins, who hated the surface folk and had soft hornless feet that couldn’t stand being stepped upon.'] },
      { id: 'pg-ch2', chapterNumber: 2, title: 'The Grandmother in the Tower', wordCount: 860, readTimeMinutes: 4, publishedDate: '1872', content: ['Lost in the unused attics of the old castle on a rainy afternoon, Irene found an ancient door leading into a circular tower. There sat an exquisite old queen spinning thread from spiderwebs by the light of a shining rose-tinted lamp.'] },
      { id: 'pg-ch3', chapterNumber: 3, title: 'Curdie and the Rhymes', wordCount: 850, readTimeMinutes: 4, publishedDate: '1872', content: ['Caught on the mountain after sunset by prowling goblins, Irene and her nurse were rescued by Curdie, the twelve-year-old miner boy, who drove the creatures away by singing loud nonsensical rhymes they could not endure.'] },
      { id: 'pg-ch4', chapterNumber: 4, title: 'The Silver Thread', wordCount: 880, readTimeMinutes: 4, publishedDate: '1872', content: ['The Grandmother presented Irene with a ring holding a strand of invisible silver thread. "When you are in danger or doubt, place your finger on the thread and follow where it leads, and it will always bring you to me."'] },
      { id: 'pg-ch5', chapterNumber: 5, title: 'The Goblin Council Below', wordCount: 870, readTimeMinutes: 4, publishedDate: '1872', content: ['Curdie hid in a rocky niche in the deep mine and overheard the goblin king plotting to undermine the king’s castle and force Princess Irene to marry Prince Harelip.'] },
      { id: 'pg-ch6', chapterNumber: 6, title: 'Curdie Trapped', wordCount: 830, readTimeMinutes: 4, publishedDate: '1872', content: ['The goblins caught Curdie and imprisoned him behind a wall of fallen boulders in the deepest mine gallery.'] },
      { id: 'pg-ch7', chapterNumber: 7, title: 'Following the Thread', wordCount: 890, readTimeMinutes: 5, publishedDate: '1872', content: ['Guided by the silver thread, little Irene walked out into the dark night, entered the goblin cave alone, and dug Curdie free with her bare hands.'] },
      { id: 'pg-ch8', chapterNumber: 8, title: 'The Assault on the Castle', wordCount: 860, readTimeMinutes: 4, publishedDate: '1872', content: ['The goblins broke through the cellar floors into the wine vault, but the miners and the king’s guards rallied.'] },
      { id: 'pg-ch9', chapterNumber: 9, title: 'Stamping on the Feet', wordCount: 850, readTimeMinutes: 4, publishedDate: '1872', content: ['Curdie shouted the secret: "Stamp on their feet!" The guards leaped onto the soft, shoe-less goblin toes, sending the horde squealing back into the caves.'] },
      { id: 'pg-ch10', chapterNumber: 10, title: 'The Mountain Cleansed', wordCount: 870, readTimeMinutes: 4, publishedDate: '1872', content: ['The subterranean mountain waters flooded the goblin tunnels, sealing them forever. Curdie was made a royal prince of the guard, and Irene looked up at the grandmother’s tower with peaceful joy.'] }
    ]
  },

  {
    id: 'at-the-back-of-the-north-wind',
    slug: 'at-the-back-of-the-north-wind',
    title: 'At the Back of the North Wind',
    synopsis: 'George MacDonald’s poetic, transcendent fairy fantasy. Little Diamond, a gentle London cabman’s son, is visited by the majestic, compassionate Lady North Wind, who sweeps him away on nighttime flights across cities and starry seas.',
    author: 'George MacDonald',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    coverAlt: 'A starry winter night sky with silver wind stirring through pine tops.',
    status: 'Completed',
    genre: 'Cozy Fantasy',
    tags: ['Public Domain', 'Pastoral', 'Bedtime', 'Victorian', 'Classic'],
    totalChapters: 10,
    rating: 5,
    readsCount: 3890,
    isPublicDomain: true,
    chapters: [
      { id: 'bnw-ch1', chapterNumber: 1, title: 'The Hayloft and the Knot-Hole', wordCount: 840, readTimeMinutes: 4, publishedDate: '1871', content: ['Little Diamond slept in a cozy loft above his father’s stable in London. Through a hole in the wooden wall, the North Wind spoke to him with a voice like singing bells and rushing leaves.'] },
      { id: 'bnw-ch2', chapterNumber: 2, title: 'The Lady of the Wind', wordCount: 860, readTimeMinutes: 4, publishedDate: '1871', content: ['She was a tall, glorious lady with dark sweeping hair that covered the stars, whose touch was sweet and bracing like fresh mountain air.'] },
      { id: 'bnw-ch3', chapterNumber: 3, title: 'A Midnight Flight Over London', wordCount: 870, readTimeMinutes: 4, publishedDate: '1871', content: ['Nestled in the folds of her cloak, Diamond flew over the rooftops of sleeping London, watching the yellow streetlamps and the dark bends of the Thames below.'] },
      { id: 'bnw-ch4', chapterNumber: 4, title: 'The Sick Baby in the Garret', wordCount: 830, readTimeMinutes: 4, publishedDate: '1871', content: ['North Wind set Diamond down down a drafty chimney to rock a sick baby and sing nursery rhymes while the weary mother slept.'] },
      { id: 'bnw-ch5', chapterNumber: 5, title: 'Diamond Drives the Cab', wordCount: 850, readTimeMinutes: 4, publishedDate: '1871', content: ['When his father fell ill with fever, little Diamond took the reins of old Diamond the cab-horse, earning honest pennies and winning the hearts of all London.'] },
      { id: 'bnw-ch6', chapterNumber: 6, title: 'The Journey to the Back of the Wind', wordCount: 880, readTimeMinutes: 4, publishedDate: '1871', content: ['North Wind took him north across the Arctic seas, stepping through the doorway of her icy heart into the country at the back of the north wind.'] },
      { id: 'bnw-ch7', chapterNumber: 7, title: 'The Country of Flowers and Peace', wordCount: 890, readTimeMinutes: 5, publishedDate: '1871', content: ['There no cold blew, no flowers ever faded, and a quiet river flowed with water so sweet that whoever drank it felt complete peace.'] },
      { id: 'bnw-ch8', chapterNumber: 8, title: 'Diamond’s Songs', wordCount: 840, readTimeMinutes: 4, publishedDate: '1871', content: ['Diamond returned to London with songs that cheered the sick, brought kindness to angry men, and softened the hardest hearts in the slums.'] },
      { id: 'bnw-ch9', chapterNumber: 9, title: 'A New Home in the Country', wordCount: 860, readTimeMinutes: 4, publishedDate: '1871', content: ['The family was rewarded for their honesty with a position managing the stables of a gentleman’s quiet estate in Kent.'] },
      { id: 'bnw-ch10', chapterNumber: 10, title: 'The Final Peaceful Flight', wordCount: 910, readTimeMinutes: 5, publishedDate: '1871', content: ['One golden autumn twilight, North Wind returned to the bedroom window. Diamond smiled, took her hand, and stepped permanently into the country of endless peace.'] }
    ]
  },

  {
    id: 'just-so-stories',
    slug: 'just-so-stories',
    title: 'Just So Stories',
    synopsis: 'Rudyard Kipling’s witty, affectionate bedtime tales explaining how the camel got his hump, how the leopard got his spots, how the elephant got his trunk, and how the first letter was written.',
    author: 'Rudyard Kipling',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?w=800&q=80',
    coverAlt: 'A peaceful African savanna riverbank at sunset.',
    status: 'Completed',
    genre: 'Cozy Fantasy',
    tags: ['Public Domain', 'Bedtime', 'Animals', 'Folklore', 'Humor'],
    totalChapters: 12,
    rating: 5,
    readsCount: 4390,
    isPublicDomain: true,
    chapters: [
      { id: 'jss-ch1', chapterNumber: 1, title: 'How the Whale Got His Throat', wordCount: 830, readTimeMinutes: 4, publishedDate: '1902', content: ['In the sea, once upon a time, O my Best Beloved, there was a Whale, and he ate fishes. He ate the starfish and the garfish, and the crab and the dab, until there was only one small fish left: a resourceful Psub-Jockey who tricked him into swallowing a sailor’s raft, which became the whalebone grating in his throat.'] },
      { id: 'jss-ch2', chapterNumber: 2, title: 'How the Camel Got His Hump', wordCount: 840, readTimeMinutes: 4, publishedDate: '1902', content: ['In the Howling Desert, the Camel refused to work with the Horse, the Dog, and the Ox, saying only "Humph!" So the Djinn of All Deserts gave him a real, bulging Humph on his back so he could work for three days without eating.'] },
      { id: 'jss-ch3', chapterNumber: 3, title: 'How the Rhinoceros Got His Skin', wordCount: 820, readTimeMinutes: 4, publishedDate: '1902', content: ['The Parsee baker poured dry, stale, itchy cake-crumbs inside the Rhino’s skin while he was swimming, which caused him to rub his skin against a palm tree into permanent folds and bad temper.'] },
      { id: 'jss-ch4', chapterNumber: 4, title: 'How the Leopard Got His Spots', wordCount: 860, readTimeMinutes: 4, publishedDate: '1902', content: ['When the zebra and giraffe hid in the speckled shadows of the great forest, the Ethiopian pressed his five black fingers into the yellow coat of the Leopard to make perfect black rosettes.'] },
      { id: 'jss-ch5', chapterNumber: 5, title: 'The Elephant’s Child', wordCount: 890, readTimeMinutes: 5, publishedDate: '1902', content: ['The little Elephant had ‘satiable curtiosity, and journeyed to the banks of the great grey-green, greasy Limpopo River to find out what the Crocodile had for dinner. The Crocodile pulled his bulgy nose into a grand trunk!'] },
      { id: 'jss-ch6', chapterNumber: 6, title: 'The Sing-Song of Old Man Kangaroo', wordCount: 810, readTimeMinutes: 4, publishedDate: '1902', content: ['In Australia, Old Man Kangaroo begged the gods to make him different from all other animals, and Dingo chased him across the salt-bush plains until his hind legs grew long and bounding.'] },
      { id: 'jss-ch7', chapterNumber: 7, title: 'The Beginning of the Armadillos', wordCount: 850, readTimeMinutes: 4, publishedDate: '1902', content: ['Slow-Solid Tortoise and Painted Jaguar taught each other tricks by the Amazon river, until Tortoise and Hedgehog joined into the armored, curling Armadillo.'] },
      { id: 'jss-ch8', chapterNumber: 8, title: 'How the First Letter Was Written', wordCount: 870, readTimeMinutes: 4, publishedDate: '1902', content: ['Little Taffy the cave-girl scratched pictures on birch bark to send for a spear, creating the very first written message—with hilarious confusion for the tribe!'] },
      { id: 'jss-ch9', chapterNumber: 9, title: 'How the Alphabet Was Made', wordCount: 860, readTimeMinutes: 4, publishedDate: '1902', content: ['Taffy and her father drew pictures for sounds: an "A" from a carp’s mouth, a "B" from a winding river, building the alphabet for all humankind.'] },
      { id: 'jss-ch10', chapterNumber: 10, title: 'The Crab That Played with the Sea', wordCount: 880, readTimeMinutes: 4, publishedDate: '1902', content: ['Pau Amma the giant crab made the tides rise and fall by crawling in and out of the deep underwater hole in the earth.'] },
      { id: 'jss-ch11', chapterNumber: 11, title: 'The Cat That Walked by Himself', wordCount: 910, readTimeMinutes: 5, publishedDate: '1902', content: ['All places were alike to him. While Dog, Horse, and Cow became domestic servants for warm milk and bone, Cat struck a bargain with the Woman to sleep by the fire and catch mice, yet walk by his wild lone in the wet woods.'] },
      { id: 'jss-ch12', chapterNumber: 12, title: 'The Butterfly That Stamped', wordCount: 850, readTimeMinutes: 4, publishedDate: '1902', content: ['King Solomon and the Queen of Sheba used the tiny flutter of a butterfly to humble nine hundred and ninety-nine quarrelsome queens.'] }
    ]
  },

  {
    id: 'the-reluctant-dragon',
    slug: 'the-reluctant-dragon',
    title: 'The Reluctant Dragon & Other Tales',
    synopsis: 'Kenneth Grahame’s delightful subversion of heroic legend. A gentle, cultured dragon prefers reciting sonnets and drinking tea to terrorizing villages, teaming up with Saint George to stage a theatrical tournament.',
    author: 'Kenneth Grahame',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    coverAlt: 'A cozy medieval green downland where a gentle dragon sleeps in the sun.',
    status: 'Completed',
    genre: 'Cozy Fantasy',
    tags: ['Public Domain', 'Humor', 'Dragons', 'Pastoral', 'Classic'],
    totalChapters: 10,
    rating: 5,
    readsCount: 3740,
    isPublicDomain: true,
    chapters: [
      { id: 'rd-ch1', chapterNumber: 1, title: 'The Shepherd’s Report', wordCount: 840, readTimeMinutes: 4, publishedDate: '1898', content: ['A shepherd returned from the Berkshire Downs with shaking knees, reporting a great scaly monster living in a cave on the chalk hill. His clever son, who read natural history books, went up to investigate.'] },
      { id: 'rd-ch2', chapterNumber: 2, title: 'A Most Civil Beast', wordCount: 860, readTimeMinutes: 4, publishedDate: '1898', content: ['The Boy found the dragon basking comfortably in the evening sun. The dragon had no desire to fight or burn anyone; he wrote sonnets and loved good conversation.'] },
      { id: 'rd-ch3', chapterNumber: 3, title: 'Saint George Arrives', wordCount: 850, readTimeMinutes: 4, publishedDate: '1898', content: ['The village called for Saint George the Dragon-Slayer, who rode into town on a white charger with shining armor and a great lance.'] },
      { id: 'rd-ch4', chapterNumber: 4, title: 'The Conference in the Cave', wordCount: 870, readTimeMinutes: 4, publishedDate: '1898', content: ['The Boy arranged a secret peace conference between the Saint and the Dragon over sandwiches. George agreed that slaughtering a poet was barbarous.'] },
      { id: 'rd-ch5', chapterNumber: 5, title: 'Rehearsing the Mock Battle', wordCount: 880, readTimeMinutes: 4, publishedDate: '1898', content: ['They rehearsed a dramatic stage battle: the dragon would roar and spirt fire, George would charge with his spear, and pin a loose fold of neck skin without drawing a drop of blood.'] },
      { id: 'rd-ch6', chapterNumber: 6, title: 'The Grand Spectacle', wordCount: 910, readTimeMinutes: 5, publishedDate: '1898', content: ['The entire county gathered on the chalk down. The battle was a roaring theatrical triumph, with cheers shaking the hills.'] },
      { id: 'rd-ch7', chapterNumber: 7, title: 'The Victory Banquet', wordCount: 860, readTimeMinutes: 4, publishedDate: '1898', content: ['George led the reformed dragon down to the village tavern, where the beast was treated to bowls of punch and proved the most entertaining guest of the evening.'] },
      { id: 'rd-ch8', chapterNumber: 8, title: 'The Golden Age: A Roman Road', wordCount: 840, readTimeMinutes: 4, publishedDate: '1898', content: ['A nostalgic story of childhood rambles along the straight ancient Roman road over the downs.'] },
      { id: 'rd-ch9', chapterNumber: 9, title: 'The Finding of the Princess', wordCount: 850, readTimeMinutes: 4, publishedDate: '1898', content: ['A little boy wanders into the garden of an old manor and meets an artist painting among the lilies.'] },
      { id: 'rd-ch10', chapterNumber: 10, title: 'Evening over the Downs', wordCount: 830, readTimeMinutes: 4, publishedDate: '1898', content: ['Walking home hand in hand with the Dragon and Saint George under the quiet stars of England.'] }
    ]
  },

  {
    id: 'a-little-princess',
    slug: 'a-little-princess',
    title: 'A Little Princess',
    synopsis: 'Frances Hodgson Burnett’s beloved classic of imagination, kindness, and dignity. When wealthy Sara Crewe loses everything at Miss Minchin’s boarding school, her generous spirit transforms a bleak attic into an enchanted palace.',
    author: 'Frances Hodgson Burnett',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'A cozy candlelit attic room with books and a warm teapot.',
    status: 'Completed',
    genre: 'Cozy Fantasy',
    tags: ['Public Domain', 'Comfort Read', 'Attic Magic', 'Kindness', 'Classic'],
    totalChapters: 12,
    rating: 5,
    readsCount: 5120,
    isPublicDomain: true,
    chapters: [
      { id: 'alp-ch1', chapterNumber: 1, title: 'Sara Arrives in London', wordCount: 850, readTimeMinutes: 4, publishedDate: '1905', content: ['Sara Crewe arrived from India with her adoring father, dressed like a little princess in velvet and fur. Miss Minchin placed her in the grandest rooms of the Seminary for Young Ladies.'] },
      { id: 'alp-ch2', chapterNumber: 2, title: 'A French Lesson and Ermengarde', wordCount: 840, readTimeMinutes: 4, publishedDate: '1905', content: ['Sara spoke French like a native Parisian, and befriended dull, tearful Ermengarde, becoming her patient teacher and protector.'] },
      { id: 'alp-ch3', chapterNumber: 3, title: 'Lottie and the Scullery Maid', wordCount: 860, readTimeMinutes: 4, publishedDate: '1905', content: ['Sara adopted four-year-old crying Lottie as her little sister, and secretly slipped cakes to Becky, the overworked, soot-stained scullery maid.'] },
      { id: 'alp-ch4', chapterNumber: 4, title: 'The Diamond Mines Calamity', wordCount: 890, readTimeMinutes: 5, publishedDate: '1905', content: ['On Sara’s eleventh birthday party, the lawyer arrived with catastrophic news: Captain Crewe had died of fever in India, and the diamond mines were penniless sand.'] },
      { id: 'alp-ch5', chapterNumber: 5, title: 'Banished to the Attic', wordCount: 870, readTimeMinutes: 4, publishedDate: '1905', content: ['Miss Minchin stripped Sara of her silk dresses and banished her to a cold, drafty attic room with a rusty iron bed, ordering her to run errands in the London rain as a drudge.'] },
      { id: 'alp-ch6', chapterNumber: 6, title: 'The Rat and the Prisoner of the Bastille', wordCount: 860, readTimeMinutes: 4, publishedDate: '1905', content: ['Sara shared her stale bread crusts with Melchisedec the attic rat, pretending she was a brave prisoner in the Bastille waiting for deliverance.'] },
      { id: 'alp-ch7', chapterNumber: 7, title: 'Sixpence on the Pavement', wordCount: 880, readTimeMinutes: 4, publishedDate: '1905', content: ['Shivering and starving in the slush, Sara found a fourpenny piece. She bought hot currant buns, giving five of the six to a poor beggar girl on the street.'] },
      { id: 'alp-ch8', chapterNumber: 8, title: 'The Indian Gentleman Next Door', wordCount: 850, readTimeMinutes: 4, publishedDate: '1905', content: ['An invalid gentleman from India moved into the house next door with his Lascar servant Ram Dass and a little monkey.'] },
      { id: 'alp-ch9', chapterNumber: 9, title: 'The Magic in the Attic', wordCount: 920, readTimeMinutes: 5, publishedDate: '1905', content: ['Waking in the cold night, Sara saw a blazing fire on the hearth, a soft quilted counterpane, rich books, and a table set with steaming roast chicken and chocolate!'] },
      { id: 'alp-ch10', chapterNumber: 10, title: 'The Monkey and the Skylight', wordCount: 870, readTimeMinutes: 4, publishedDate: '1905', content: ['The next evening, Ram Dass’s pet monkey climbed across the wet slate roof through Sara’s skylight. Sara wrapped him in her coat to return him.'] },
      { id: 'alp-ch11', chapterNumber: 11, title: 'The Lost Child Found', wordCount: 930, readTimeMinutes: 5, publishedDate: '1905', content: ['When Sara brought the monkey to the gentleman next door, Mr. Carrisford discovered that the little ragged girl was Captain Crewe’s lost daughter whom he had spent months searching for!'] },
      { id: 'alp-ch12', chapterNumber: 12, title: 'The Bread of Kindness', wordCount: 910, readTimeMinutes: 5, publishedDate: '1905', content: ['Sara’s diamond fortune was restored tenfold. She took Becky to be her companion, and arranged for the bakerwoman to give hot meat pies to every starving child who passed.'] }
    ]
  }
];
