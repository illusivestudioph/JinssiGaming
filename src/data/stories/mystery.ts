import type { Story } from '../stories';

export const mysteryBooks: Story[] = [
  {
    id: 'hound-of-baskervilles',
    slug: 'the-hound-of-the-baskervilles',
    title: 'The Hound of the Baskervilles',
    synopsis: 'Sherlock Holmes and Dr. Watson investigate the ancient family curse of a colossal spectral hound that haunts the treacherous, fog-drenched Dartmoor mires after the sudden death of Sir Charles Baskerville.',
    author: 'Arthur Conan Doyle',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&q=80',
    coverAlt: 'A solitary lantern casting light on a foggy cobblestone lane at midnight.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Gothic Mystery', 'Sherlock Holmes', 'Dartmoor', 'Classic'],
    totalChapters: 12,
    rating: 5,
    readsCount: 5980,
    isPublicDomain: true,
    chapters: [
      {
        id: 'hob-ch1',
        chapterNumber: 1,
        title: 'Mr. Sherlock Holmes',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Holmes examines the walking stick left behind by Dr. James Mortimer.',
        content: [
          'Mr. Sherlock Holmes, who was usually very late in the mornings, save upon those not infrequent occasions when he was up all night, was seated at the breakfast table. I stood upon the hearth-rug and picked up the stick which our visitor had left behind him the night before.',
          'It was a fine, thick piece of wood, bulbous-headed, of the sort which is known as a "Penang lawyer." Just under the head was a broad silver band nearly an inch across. "To James Mortimer, M.R.C.S., from his friends of the C.C.H.," was engraved upon it, with the date "1884."',
          '"Well, Watson, what do you make of it?" Holmes asked, leaning back with a cloud of pipe smoke.'
        ]
      },
      {
        id: 'hob-ch2',
        chapterNumber: 2,
        title: 'The Curse of the Baskervilles',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Dr. Mortimer reads the 1742 manuscript of Hugo Baskerville and the hound.',
        content: [
          'Dr. Mortimer drew an ancient yellowed manuscript from his breast-pocket, written in the crabbed script of the mid-eighteenth century.',
          'It recorded how the wicked Sir Hugo Baskerville, pursuing a terrified maiden across the moor on Michaelmas night, was found dead beside a deep dip or coombe.',
          'Standing over Hugo and plucking at his throat stood a foul thing, a great, black beast, shaped like a hound, yet larger than any hound that ever mortal eye had rested upon.',
          'Mortimer looked up at Holmes with eyes full of terror: "Sir Charles Baskerville was found dead in the yew alley three weeks ago. Not far from the body on the moist gravel were footprints."',
          '"A man’s or a woman’s?" asked Holmes.',
          'Dr. Mortimer lowered his voice: "Mr. Holmes, they were the footprints of a gigantic hound!"'
        ]
      },
      {
        id: 'hob-ch3',
        chapterNumber: 3,
        title: 'The Problem',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Holmes and Watson consider whether Sir Henry Baskerville should go to Devonshire.',
        content: [
          'Holmes sat for an hour in his dressing-gown, smoking his strongest shag tobacco in concentrated silence.',
          'Sir Henry Baskerville, the nephew and sole heir, had just arrived from Canada.',
          'That very morning at his London hotel, Sir Henry had received an anonymous warning composed of words cut from The Times: "As you value your life or your reason keep away from the moor."',
          'Worse still, one of Sir Henry’s new tan boots had been mysteriously stolen from outside his hotel bedroom door.'
        ]
      },
      {
        id: 'hob-ch4',
        chapterNumber: 4,
        title: 'Sir Henry Baskerville',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Meeting the resolute Canadian heir and discovering the spy in Regent Street.',
        content: [
          'Sir Henry Baskerville was a small, alert, dark-eyed man of about thirty, with sturdy limbs and a fiery, courageous disposition.',
          '"There is no devil in hell, Mr. Holmes, and there is no man upon earth who can prevent me from going to the home of my own people," he declared.',
          'As they left Baker Street, Holmes spotted a cab shadowing Sir Henry. The passenger had a bushy black beard.',
          'Holmes took the cab number, but the spy slipped away into the London traffic.'
        ]
      },
      {
        id: 'hob-ch5',
        chapterNumber: 5,
        title: 'Three Broken Threads',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Holmes dispatches Watson to Dartmoor to act as Sir Henry’s armed bodyguard.',
        content: [
          'Holmes sent telegrams and inquiries, but every lead broke in his hands.',
          'Unable to leave London himself, Holmes instructed Watson to accompany Sir Henry to Baskerville Hall, armed with a revolver, and report every detail of the household and neighbors.',
          '"Bear in mind, Watson," Holmes cautioned gravely at Paddington station, "that you are going into the presence of danger. Trust no one, and never leave Sir Henry alone upon the moor after dark."'
        ]
      },
      {
        id: 'hob-ch6',
        chapterNumber: 6,
        title: 'Baskerville Hall',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Arrival in Devonshire through armed patrols guarding against the escaped convict.',
        content: [
          'The train carried them through the green lanes of Devonshire to the borders of the grim granite moor.',
          'Armed soldiers stood at the crossroads: Selden, the notorious Notting Hill murderer, had escaped from Princetown prison and was hiding somewhere among the rocky tors.',
          'Baskerville Hall was a gloomy manor of dark granite, flanked by ancient towers and backed by black firs.',
          'Barrymore, the butler with the heavy black beard, welcomed them with stiff civility.',
          'That night, lying awake in the drafty bedroom, Watson heard the distinct, muffled sobbing of a weeping woman echoing down the stone corridor.'
        ]
      },
      {
        id: 'hob-ch7',
        chapterNumber: 7,
        title: 'The Stapletons of Merripit House',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1902',
        authorNote: 'Watson meets the naturalist Stapleton and the treacherous Grimpen Mire.',
        content: [
          'The next morning Watson walked across the moor to Merripit House, meeting Jack Stapleton, a lively naturalist with a butterfly net.',
          'Stapleton pointed out the great Grimpen Mire, an innocent-looking bright green bog where ponies and men sank to their deaths in the black slime.',
          'Suddenly, rolling across the desolate waste, came a long, deep, melancholy howl that curdled Watson’s blood.',
          'Stapleton’s beautiful sister Beryl mistook Watson for Sir Henry, frantically whispering: "Go back! Go straight back to London this very night! I cannot tell you why, but for your life’s sake, never set foot upon this moor again!"'
        ]
      },
      {
        id: 'hob-ch8',
        chapterNumber: 8,
        title: 'First Report of Dr. Watson',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Watson’s letter to Holmes recounting nocturnal candle signals.',
        content: [
          'Watson observed Sir Henry falling deeply in love with Beryl Stapleton, while her brother reacted with furious, unreasonable jealousy.',
          'At two in the morning, Watson caught Barrymore creeping down the hall to a window facing the moor, holding a lighted candle.',
          'Looking out into the black night, Watson saw an answering flicker of light from the jagged granite tor half a mile away.',
          'Someone was signaling to the escaped convict!'
        ]
      },
      {
        id: 'hob-ch9',
        chapterNumber: 9,
        title: 'The Light Upon the Moor',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1902',
        authorNote: 'Sir Henry and Watson ambush Barrymore and hunt the convict in the rain.',
        content: [
          'Sir Henry and Watson confronted Barrymore at the window.',
          'Mrs. Barrymore burst in weeping, confessing that Selden the convict was her youngest brother, starving on the moor.',
          'Sir Henry and Watson ran out into the driving rain to capture the felon.',
          'By the light of the moon on the Black Tor above them, Watson caught sight of another figure—a tall, thin man standing silhouetted against the sky, arms folded, watching them from the granite heights.'
        ]
      },
      {
        id: 'hob-ch10',
        chapterNumber: 10,
        title: 'The Man on the Tor',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1902',
        authorNote: 'Watson tracks the mysterious watcher to a prehistoric stone hut.',
        content: [
          'Determined to unmask the watcher, Watson searched the prehistoric stone huts of the moor.',
          'In one hut he found a pannikin, a pile of dry heather, and a discarded cigarette end stamped "Bradley, Oxford Street."',
          'A shadow fell across the threshold, and a cool, familiar voice spoke: "It is a lovely evening, my dear Watson."',
          'It was Sherlock Holmes himself! Holmes had lived secretly in the hut for days, watching Stapleton weave his web.'
        ]
      },
      {
        id: 'hob-ch11',
        chapterNumber: 11,
        title: 'Death on the Moor',
        wordCount: 920,
        readTimeMinutes: 5,
        publishedDate: '1902',
        authorNote: 'The hound strikes, but kills the wrong victim.',
        content: [
          'As Holmes and Watson conferred, a blood-curdling baying echoed from the Grimpen Mire, followed by screams of mortal agony.',
          'They rushed through the boulders and found a body dashed to pieces at the foot of a cliff.',
          'For an instant Watson thought it was Sir Henry, but it was Selden the convict, who had been given Sir Henry’s cast-off clothes by Barrymore!',
          'The scent on the clothes had drawn the hound to its prey.',
          'Stapleton stepped out of the darkness with an oil lantern, unable to conceal his astonishment at finding Holmes standing beside the corpse.'
        ]
      },
      {
        id: 'hob-ch12',
        chapterNumber: 12,
        title: 'The Fog and the Hound of Fire',
        wordCount: 960,
        readTimeMinutes: 5,
        publishedDate: '1902',
        authorNote: 'The final confrontation at Merripit House as the white fog rolls in.',
        content: [
          'Holmes laid his trap: Sir Henry dined alone at Stapleton’s house, walking home alone across the moor while Holmes, Watson, and Inspector Lestrade lay in ambush.',
          'A thick white fog crept up from the Grimpen Mire like a ghostly tide, blinding their view.',
          'Then, bursting out of the mist, came the hound: a beast immense, coal-black, from whose open mouth spurted blue luminous fire, its eyes glowing with dull coals of phosphorescent flame!',
          'It leaped after Sir Henry. Holmes and Watson fired five revolver shots. The beast leaped into the air with a howl of agony and fell dead upon the moss, bathed in phosphorus.',
          'Stapleton fled into the treacherous mire in the dark, losing his footing on the bog path and sinking forever into the black depths of the Grimpen Mire.'
        ]
      }
    ]
  },

  {
    id: 'adventures-of-sherlock-holmes',
    slug: 'the-adventures-of-sherlock-holmes',
    title: 'The Adventures of Sherlock Holmes',
    synopsis: 'Arthur Conan Doyle’s landmark short story collection. Twelve brilliant investigations from 221B Baker Street, including A Scandal in Bohemia, The Red-Headed League, The Speckled Band, and The Blue Carbuncle.',
    author: 'Arthur Conan Doyle',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'Sherlock Holmes pipe, violin, and magnifying glass beside 221B Baker Street hearth.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Baker Street', 'Classic Mystery', 'Doyle', 'Victorian'],
    totalChapters: 12,
    rating: 5,
    readsCount: 6240,
    isPublicDomain: true,
    chapters: [
          {
                "id": "ash-ch1",
                "chapterNumber": 1,
                "title": "A Scandal in Bohemia",
                "wordCount": 614,
                "readTimeMinutes": 3,
                "publishedDate": "1892",
                "authorNote": "Authentic unabridged text from The Strand Magazine / Project Gutenberg eBook #1661.",
                "content": [
                      "To Sherlock Holmes she is always _the_ woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position. He never spoke of the softer passions, save with a gibe and a sneer. They were admirable things for the observer—excellent for drawing the veil from men’s motives and actions. But for the trained reasoner to admit such intrusions into his own delicate and finely adjusted temperament was to introduce a distracting factor which might throw a doubt upon all his mental results. Grit in a sensitive instrument, or a crack in one of his own high-power lenses, would not be more disturbing than a strong emotion in a nature such as his. And yet there was but one woman to him, and that woman was the late Irene Adler, of dubious and questionable memory.",
                      "I had seen little of Holmes lately. My marriage had drifted us away from each other. My own complete happiness, and the home-centred interests which rise up around the man who first finds himself master of his own establishment, were sufficient to absorb all my attention, while Holmes, who loathed every form of society with his whole Bohemian soul, remained in our lodgings in Baker Street, buried among his old books, and alternating from week to week between cocaine and ambition, the drowsiness of the drug, and the fierce energy of his own keen nature. He was still, as ever, deeply attracted by the study of crime, and occupied his immense faculties and extraordinary powers of observation in following out those clues, and clearing up those mysteries which had been abandoned as hopeless by the official police. From time to time I heard some vague account of his doings: of his summons to Odessa in the case of the Trepoff murder, of his clearing up of the singular tragedy of the Atkinson brothers at Trincomalee, and finally of the mission which he had accomplished so delicately and successfully for the reigning family of Holland. Beyond these signs of his activity, however, which I merely shared with all the readers of the daily press, I knew little of my former friend and companion.",
                      "One night—it was on the twentieth of March, 1888—I was returning from a journey to a patient (for I had now returned to civil practice), when my way led me through Baker Street. As I passed the well-remembered door, which must always be associated in my mind with my wooing, and with the dark incidents of the Study in Scarlet, I was seized with a keen desire to see Holmes again, and to know how he was employing his extraordinary powers. His rooms were brilliantly lit, and, even as I looked up, I saw his tall, spare figure pass twice in a dark silhouette against the blind. He was pacing the room swiftly, eagerly, with his head sunk upon his chest and his hands clasped behind him. To me, who knew his every mood and habit, his attitude and manner told their own story. He was at work again. He had risen out of his drug-created dreams and was hot upon the scent of some new problem. I rang the bell and was shown up to the chamber which had formerly been in part my own."
                ]
          },
          {
                "id": "ash-ch2",
                "chapterNumber": 2,
                "title": "The Red-Headed League",
                "wordCount": 647,
                "readTimeMinutes": 3,
                "publishedDate": "1892",
                "authorNote": "Authentic unabridged text from The Strand Magazine / Project Gutenberg eBook #1661.",
                "content": [
                      "I had called upon my friend, Mr. Sherlock Holmes, one day in the autumn of last year and found him in deep conversation with a very stout, florid-faced, elderly gentleman with fiery red hair. With an apology for my intrusion, I was about to withdraw when Holmes pulled me abruptly into the room and closed the door behind me.",
                      "“You could not possibly have come at a better time, my dear Watson,” he said cordially.",
                      "“I was afraid that you were engaged.”",
                      "“So I am. Very much so.”",
                      "“Then I can wait in the next room.”",
                      "“Not at all. This gentleman, Mr. Wilson, has been my partner and helper in many of my most successful cases, and I have no doubt that he will be of the utmost use to me in yours also.”",
                      "The stout gentleman half rose from his chair and gave a bob of greeting, with a quick little questioning glance from his small fat-encircled eyes.",
                      "“Try the settee,” said Holmes, relapsing into his armchair and putting his fingertips together, as was his custom when in judicial moods. “I know, my dear Watson, that you share my love of all that is bizarre and outside the conventions and humdrum routine of everyday life. You have shown your relish for it by the enthusiasm which has prompted you to chronicle, and, if you will excuse my saying so, somewhat to embellish so many of my own little adventures.”",
                      "“Your cases have indeed been of the greatest interest to me,” I observed.",
                      "“You will remember that I remarked the other day, just before we went into the very simple problem presented by Miss Mary Sutherland, that for strange effects and extraordinary combinations we must go to life itself, which is always far more daring than any effort of the imagination.”",
                      "“A proposition which I took the liberty of doubting.”",
                      "“You did, Doctor, but none the less you must come round to my view, for otherwise I shall keep on piling fact upon fact on you until your reason breaks down under them and acknowledges me to be right. Now, Mr. Jabez Wilson here has been good enough to call upon me this morning, and to begin a narrative which promises to be one of the most singular which I have listened to for some time. You have heard me remark that the strangest and most unique things are very often connected not with the larger but with the smaller crimes, and occasionally, indeed, where there is room for doubt whether any positive crime has been committed. As far as I have heard, it is impossible for me to say whether the present case is an instance of crime or not, but the course of events is certainly among the most singular that I have ever listened to. Perhaps, Mr. Wilson, you would have the great kindness to recommence your narrative. I ask you not merely because my friend Dr. Watson has not heard the opening part but also because the peculiar nature of the story makes me anxious to have every possible detail from your lips. As a rule, when I have heard some slight indication of the course of events, I am able to guide myself by the thousands of other similar cases which occur to my memory. In the present instance I am forced to admit that the facts are, to the best of my belief, unique.”",
                      "The portly client puffed out his chest with an appearance of some little pride and pulled a dirty and wrinkled newspaper from the inside pocket of his greatcoat. As he glanced down the advertisement column, with his head thrust forward and the paper flattened out upon his knee, I took a good look at the man and endeavoured, after the fashion of my companion, to read the indications which might be presented by his dress or appearance."
                ]
          },
          {
                "id": "ash-ch3",
                "chapterNumber": 3,
                "title": "A Case of Identity",
                "wordCount": 611,
                "readTimeMinutes": 3,
                "publishedDate": "1892",
                "authorNote": "Authentic unabridged text from The Strand Magazine / Project Gutenberg eBook #1661.",
                "content": [
                      "“My dear fellow,” said Sherlock Holmes as we sat on either side of the fire in his lodgings at Baker Street, “life is infinitely stranger than anything which the mind of man could invent. We would not dare to conceive the things which are really mere commonplaces of existence. If we could fly out of that window hand in hand, hover over this great city, gently remove the roofs, and peep in at the queer things which are going on, the strange coincidences, the plannings, the cross-purposes, the wonderful chains of events, working through generations, and leading to the most _outré_ results, it would make all fiction with its conventionalities and foreseen conclusions most stale and unprofitable.”",
                      "“And yet I am not convinced of it,” I answered. “The cases which come to light in the papers are, as a rule, bald enough, and vulgar enough. We have in our police reports realism pushed to its extreme limits, and yet the result is, it must be confessed, neither fascinating nor artistic.”",
                      "“A certain selection and discretion must be used in producing a realistic effect,” remarked Holmes. “This is wanting in the police report, where more stress is laid, perhaps, upon the platitudes of the magistrate than upon the details, which to an observer contain the vital essence of the whole matter. Depend upon it, there is nothing so unnatural as the commonplace.”",
                      "I smiled and shook my head. “I can quite understand your thinking so,” I said. “Of course, in your position of unofficial adviser and helper to everybody who is absolutely puzzled, throughout three continents, you are brought in contact with all that is strange and bizarre. But here”—I picked up the morning paper from the ground—“let us put it to a practical test. Here is the first heading upon which I come. ‘A husband’s cruelty to his wife.’ There is half a column of print, but I know without reading it that it is all perfectly familiar to me. There is, of course, the other woman, the drink, the push, the blow, the bruise, the sympathetic sister or landlady. The crudest of writers could invent nothing more crude.”",
                      "“Indeed, your example is an unfortunate one for your argument,” said Holmes, taking the paper and glancing his eye down it. “This is the Dundas separation case, and, as it happens, I was engaged in clearing up some small points in connection with it. The husband was a teetotaler, there was no other woman, and the conduct complained of was that he had drifted into the habit of winding up every meal by taking out his false teeth and hurling them at his wife, which, you will allow, is not an action likely to occur to the imagination of the average story-teller. Take a pinch of snuff, Doctor, and acknowledge that I have scored over you in your example.”",
                      "He held out his snuffbox of old gold, with a great amethyst in the centre of the lid. Its splendour was in such contrast to his homely ways and simple life that I could not help commenting upon it.",
                      "“Ah,” said he, “I forgot that I had not seen you for some weeks. It is a little souvenir from the King of Bohemia in return for my assistance in the case of the Irene Adler papers.”",
                      "“And the ring?” I asked, glancing at a remarkable brilliant which sparkled upon his finger.",
                      "“It was from the reigning family of Holland, though the matter in which I served them was of such delicacy that I cannot confide it even to you, who have been good enough to chronicle one or two of my little problems.”"
                ]
          },
          {
                "id": "ash-ch4",
                "chapterNumber": 4,
                "title": "The Boscombe Valley Mystery",
                "wordCount": 735,
                "readTimeMinutes": 4,
                "publishedDate": "1892",
                "authorNote": "Authentic unabridged text from The Strand Magazine / Project Gutenberg eBook #1661.",
                "content": [
                      "We were seated at breakfast one morning, my wife and I, when the maid brought in a telegram. It was from Sherlock Holmes and ran in this way:",
                      "“Have you a couple of days to spare? Have just been wired for from the west of England in connection with Boscombe Valley tragedy. Shall be glad if you will come with me. Air and scenery perfect. Leave Paddington by the 11:15.”",
                      "“What do you say, dear?” said my wife, looking across at me. “Will you go?”",
                      "“I really don’t know what to say. I have a fairly long list at present.”",
                      "“Oh, Anstruther would do your work for you. You have been looking a little pale lately. I think that the change would do you good, and you are always so interested in Mr. Sherlock Holmes’ cases.”",
                      "“I should be ungrateful if I were not, seeing what I gained through one of them,” I answered. “But if I am to go, I must pack at once, for I have only half an hour.”",
                      "My experience of camp life in Afghanistan had at least had the effect of making me a prompt and ready traveller. My wants were few and simple, so that in less than the time stated I was in a cab with my valise, rattling away to Paddington Station. Sherlock Holmes was pacing up and down the platform, his tall, gaunt figure made even gaunter and taller by his long grey travelling-cloak and close-fitting cloth cap.",
                      "“It is really very good of you to come, Watson,” said he. “It makes a considerable difference to me, having someone with me on whom I can thoroughly rely. Local aid is always either worthless or else biassed. If you will keep the two corner seats I shall get the tickets.”",
                      "We had the carriage to ourselves save for an immense litter of papers which Holmes had brought with him. Among these he rummaged and read, with intervals of note-taking and of meditation, until we were past Reading. Then he suddenly rolled them all into a gigantic ball and tossed them up onto the rack.",
                      "“Have you heard anything of the case?” he asked.",
                      "“Not a word. I have not seen a paper for some days.”",
                      "“The London press has not had very full accounts. I have just been looking through all the recent papers in order to master the particulars. It seems, from what I gather, to be one of those simple cases which are so extremely difficult.”",
                      "“That sounds a little paradoxical.”",
                      "“But it is profoundly true. Singularity is almost invariably a clue. The more featureless and commonplace a crime is, the more difficult it is to bring it home. In this case, however, they have established a very serious case against the son of the murdered man.”",
                      "“It is a murder, then?”",
                      "“Well, it is conjectured to be so. I shall take nothing for granted until I have the opportunity of looking personally into it. I will explain the state of things to you, as far as I have been able to understand it, in a very few words.",
                      "“Boscombe Valley is a country district not very far from Ross, in Herefordshire. The largest landed proprietor in that part is a Mr. John Turner, who made his money in Australia and returned some years ago to the old country. One of the farms which he held, that of Hatherley, was let to Mr. Charles McCarthy, who was also an ex-Australian. The men had known each other in the colonies, so that it was not unnatural that when they came to settle down they should do so as near each other as possible. Turner was apparently the richer man, so McCarthy became his tenant but still remained, it seems, upon terms of perfect equality, as they were frequently together. McCarthy had one son, a lad of eighteen, and Turner had an only daughter of the same age, but neither of them had wives living. They appear to have avoided the society of the neighbouring English families and to have led retired lives, though both the McCarthys were fond of sport and were frequently seen at the race-meetings of the neighbourhood. McCarthy kept two servants—a man and a girl. Turner had a considerable household, some half-dozen at the least. That is as much as I have been able to gather about the families. Now for the facts."
                ]
          },
          {
                "id": "ash-ch5",
                "chapterNumber": 5,
                "title": "The Five Orange Pips",
                "wordCount": 632,
                "readTimeMinutes": 3,
                "publishedDate": "1892",
                "authorNote": "Authentic unabridged text from The Strand Magazine / Project Gutenberg eBook #1661.",
                "content": [
                      "When I glance over my notes and records of the Sherlock Holmes cases between the years ’82 and ’90, I am faced by so many which present strange and interesting features that it is no easy matter to know which to choose and which to leave. Some, however, have already gained publicity through the papers, and others have not offered a field for those peculiar qualities which my friend possessed in so high a degree, and which it is the object of these papers to illustrate. Some, too, have baffled his analytical skill, and would be, as narratives, beginnings without an ending, while others have been but partially cleared up, and have their explanations founded rather upon conjecture and surmise than on that absolute logical proof which was so dear to him. There is, however, one of these last which was so remarkable in its details and so startling in its results that I am tempted to give some account of it in spite of the fact that there are points in connection with it which never have been, and probably never will be, entirely cleared up.",
                      "The year ’87 furnished us with a long series of cases of greater or less interest, of which I retain the records. Among my headings under this one twelve months I find an account of the adventure of the Paradol Chamber, of the Amateur Mendicant Society, who held a luxurious club in the lower vault of a furniture warehouse, of the facts connected with the loss of the British barque _Sophy Anderson_, of the singular adventures of the Grice Patersons in the island of Uffa, and finally of the Camberwell poisoning case. In the latter, as may be remembered, Sherlock Holmes was able, by winding up the dead man’s watch, to prove that it had been wound up two hours before, and that therefore the deceased had gone to bed within that time—a deduction which was of the greatest importance in clearing up the case. All these I may sketch out at some future date, but none of them present such singular features as the strange train of circumstances which I have now taken up my pen to describe.",
                      "It was in the latter days of September, and the equinoctial gales had set in with exceptional violence. All day the wind had screamed and the rain had beaten against the windows, so that even here in the heart of great, hand-made London we were forced to raise our minds for the instant from the routine of life and to recognise the presence of those great elemental forces which shriek at mankind through the bars of his civilisation, like untamed beasts in a cage. As evening drew in, the storm grew higher and louder, and the wind cried and sobbed like a child in the chimney. Sherlock Holmes sat moodily at one side of the fireplace cross-indexing his records of crime, while I at the other was deep in one of Clark Russell’s fine sea-stories until the howl of the gale from without seemed to blend with the text, and the splash of the rain to lengthen out into the long swash of the sea waves. My wife was on a visit to her mother’s, and for a few days I was a dweller once more in my old quarters at Baker Street.",
                      "“Why,” said I, glancing up at my companion, “that was surely the bell. Who could come to-night? Some friend of yours, perhaps?”",
                      "“Except yourself I have none,” he answered. “I do not encourage visitors.”",
                      "“If so, it is a serious case. Nothing less would bring a man out on such a day and at such an hour. But I take it that it is more likely to be some crony of the landlady’s.”"
                ]
          },
          {
                "id": "ash-ch6",
                "chapterNumber": 6,
                "title": "The Man with the Twisted Lip",
                "wordCount": 612,
                "readTimeMinutes": 3,
                "publishedDate": "1892",
                "authorNote": "Authentic unabridged text from The Strand Magazine / Project Gutenberg eBook #1661.",
                "content": [
                      "Isa Whitney, brother of the late Elias Whitney, D.D., Principal of the Theological College of St. George’s, was much addicted to opium. The habit grew upon him, as I understand, from some foolish freak when he was at college; for having read De Quincey’s description of his dreams and sensations, he had drenched his tobacco with laudanum in an attempt to produce the same effects. He found, as so many more have done, that the practice is easier to attain than to get rid of, and for many years he continued to be a slave to the drug, an object of mingled horror and pity to his friends and relatives. I can see him now, with yellow, pasty face, drooping lids, and pin-point pupils, all huddled in a chair, the wreck and ruin of a noble man.",
                      "One night—it was in June, ’89—there came a ring to my bell, about the hour when a man gives his first yawn and glances at the clock. I sat up in my chair, and my wife laid her needle-work down in her lap and made a little face of disappointment.",
                      "“A patient!” said she. “You’ll have to go out.”",
                      "I groaned, for I was newly come back from a weary day.",
                      "We heard the door open, a few hurried words, and then quick steps upon the linoleum. Our own door flew open, and a lady, clad in some dark-coloured stuff, with a black veil, entered the room.",
                      "“You will excuse my calling so late,” she began, and then, suddenly losing her self-control, she ran forward, threw her arms about my wife’s neck, and sobbed upon her shoulder. “Oh, I’m in such trouble!” she cried; “I do so want a little help.”",
                      "“Why,” said my wife, pulling up her veil, “it is Kate Whitney. How you startled me, Kate! I had not an idea who you were when you came in.”",
                      "“I didn’t know what to do, so I came straight to you.” That was always the way. Folk who were in grief came to my wife like birds to a lighthouse.",
                      "“It was very sweet of you to come. Now, you must have some wine and water, and sit here comfortably and tell us all about it. Or should you rather that I sent James off to bed?”",
                      "“Oh, no, no! I want the doctor’s advice and help, too. It’s about Isa. He has not been home for two days. I am so frightened about him!”",
                      "It was not the first time that she had spoken to us of her husband’s trouble, to me as a doctor, to my wife as an old friend and school companion. We soothed and comforted her by such words as we could find. Did she know where her husband was? Was it possible that we could bring him back to her?",
                      "It seems that it was. She had the surest information that of late he had, when the fit was on him, made use of an opium den in the farthest east of the City. Hitherto his orgies had always been confined to one day, and he had come back, twitching and shattered, in the evening. But now the spell had been upon him eight-and-forty hours, and he lay there, doubtless among the dregs of the docks, breathing in the poison or sleeping off the effects. There he was to be found, she was sure of it, at the Bar of Gold, in Upper Swandam Lane. But what was she to do? How could she, a young and timid woman, make her way into such a place and pluck her husband out from among the ruffians who surrounded him?"
                ]
          },
          {
                "id": "ash-ch7",
                "chapterNumber": 7,
                "title": "The Adventure of the Blue Carbuncle",
                "wordCount": 687,
                "readTimeMinutes": 3,
                "publishedDate": "1892",
                "authorNote": "Authentic unabridged text from The Strand Magazine / Project Gutenberg eBook #1661.",
                "content": [
                      "I had called upon my friend Sherlock Holmes upon the second morning after Christmas, with the intention of wishing him the compliments of the season. He was lounging upon the sofa in a purple dressing-gown, a pipe-rack within his reach upon the right, and a pile of crumpled morning papers, evidently newly studied, near at hand. Beside the couch was a wooden chair, and on the angle of the back hung a very seedy and disreputable hard-felt hat, much the worse for wear, and cracked in several places. A lens and a forceps lying upon the seat of the chair suggested that the hat had been suspended in this manner for the purpose of examination.",
                      "“You are engaged,” said I; “perhaps I interrupt you.”",
                      "“Not at all. I am glad to have a friend with whom I can discuss my results. The matter is a perfectly trivial one”—he jerked his thumb in the direction of the old hat—“but there are points in connection with it which are not entirely devoid of interest and even of instruction.”",
                      "I seated myself in his armchair and warmed my hands before his crackling fire, for a sharp frost had set in, and the windows were thick with the ice crystals. “I suppose,” I remarked, “that, homely as it looks, this thing has some deadly story linked on to it—that it is the clue which will guide you in the solution of some mystery and the punishment of some crime.”",
                      "“No, no. No crime,” said Sherlock Holmes, laughing. “Only one of those whimsical little incidents which will happen when you have four million human beings all jostling each other within the space of a few square miles. Amid the action and reaction of so dense a swarm of humanity, every possible combination of events may be expected to take place, and many a little problem will be presented which may be striking and bizarre without being criminal. We have already had experience of such.”",
                      "“So much so,” I remarked, “that of the last six cases which I have added to my notes, three have been entirely free of any legal crime.”",
                      "“Precisely. You allude to my attempt to recover the Irene Adler papers, to the singular case of Miss Mary Sutherland, and to the adventure of the man with the twisted lip. Well, I have no doubt that this small matter will fall into the same innocent category. You know Peterson, the commissionaire?”",
                      "“It is to him that this trophy belongs.”",
                      "“No, no, he found it. Its owner is unknown. I beg that you will look upon it not as a battered billycock but as an intellectual problem. And, first, as to how it came here. It arrived upon Christmas morning, in company with a good fat goose, which is, I have no doubt, roasting at this moment in front of Peterson’s fire. The facts are these: about four o’clock on Christmas morning, Peterson, who, as you know, is a very honest fellow, was returning from some small jollification and was making his way homeward down Tottenham Court Road. In front of him he saw, in the gaslight, a tallish man, walking with a slight stagger, and carrying a white goose slung over his shoulder. As he reached the corner of Goodge Street, a row broke out between this stranger and a little knot of roughs. One of the latter knocked off the man’s hat, on which he raised his stick to defend himself and, swinging it over his head, smashed the shop window behind him. Peterson had rushed forward to protect the stranger from his assailants; but the man, shocked at having broken the window, and seeing an official-looking person in uniform rushing towards him, dropped his goose, took to his heels, and vanished amid the labyrinth of small streets which lie at the back of Tottenham Court Road. The roughs had also fled at the appearance of Peterson, so that he was left in possession of the field of battle, and also of the spoils of victory in the shape of this battered hat and a most unimpeachable Christmas goose.”"
                ]
          },
          {
                "id": "ash-ch8",
                "chapterNumber": 8,
                "title": "The Adventure of the Speckled Band",
                "wordCount": 612,
                "readTimeMinutes": 3,
                "publishedDate": "1892",
                "authorNote": "Authentic unabridged text from The Strand Magazine / Project Gutenberg eBook #1661.",
                "content": [
                      "On glancing over my notes of the seventy odd cases in which I have during the last eight years studied the methods of my friend Sherlock Holmes, I find many tragic, some comic, a large number merely strange, but none commonplace; for, working as he did rather for the love of his art than for the acquirement of wealth, he refused to associate himself with any investigation which did not tend towards the unusual, and even the fantastic. Of all these varied cases, however, I cannot recall any which presented more singular features than that which was associated with the well-known Surrey family of the Roylotts of Stoke Moran. The events in question occurred in the early days of my association with Holmes, when we were sharing rooms as bachelors in Baker Street. It is possible that I might have placed them upon record before, but a promise of secrecy was made at the time, from which I have only been freed during the last month by the untimely death of the lady to whom the pledge was given. It is perhaps as well that the facts should now come to light, for I have reasons to know that there are widespread rumours as to the death of Dr. Grimesby Roylott which tend to make the matter even more terrible than the truth.",
                      "It was early in April in the year ’83 that I woke one morning to find Sherlock Holmes standing, fully dressed, by the side of my bed. He was a late riser, as a rule, and as the clock on the mantelpiece showed me that it was only a quarter-past seven, I blinked up at him in some surprise, and perhaps just a little resentment, for I was myself regular in my habits.",
                      "“Very sorry to knock you up, Watson,” said he, “but it’s the common lot this morning. Mrs. Hudson has been knocked up, she retorted upon me, and I on you.”",
                      "“What is it, then—a fire?”",
                      "“No; a client. It seems that a young lady has arrived in a considerable state of excitement, who insists upon seeing me. She is waiting now in the sitting-room. Now, when young ladies wander about the metropolis at this hour of the morning, and knock sleepy people up out of their beds, I presume that it is something very pressing which they have to communicate. Should it prove to be an interesting case, you would, I am sure, wish to follow it from the outset. I thought, at any rate, that I should call you and give you the chance.”",
                      "“My dear fellow, I would not miss it for anything.”",
                      "I had no keener pleasure than in following Holmes in his professional investigations, and in admiring the rapid deductions, as swift as intuitions, and yet always founded on a logical basis with which he unravelled the problems which were submitted to him. I rapidly threw on my clothes and was ready in a few minutes to accompany my friend down to the sitting-room. A lady dressed in black and heavily veiled, who had been sitting in the window, rose as we entered.",
                      "“Good-morning, madam,” said Holmes cheerily. “My name is Sherlock Holmes. This is my intimate friend and associate, Dr. Watson, before whom you can speak as freely as before myself. Ha! I am glad to see that Mrs. Hudson has had the good sense to light the fire. Pray draw up to it, and I shall order you a cup of hot coffee, for I observe that you are shivering.”",
                      "“It is not cold which makes me shiver,” said the woman in a low voice, changing her seat as requested."
                ]
          },
          {
                "id": "ash-ch9",
                "chapterNumber": 9,
                "title": "The Adventure of the Engineer’s Thumb",
                "wordCount": 653,
                "readTimeMinutes": 3,
                "publishedDate": "1892",
                "authorNote": "Authentic unabridged text from The Strand Magazine / Project Gutenberg eBook #1661.",
                "content": [
                      "Of all the problems which have been submitted to my friend, Mr. Sherlock Holmes, for solution during the years of our intimacy, there were only two which I was the means of introducing to his notice—that of Mr. Hatherley’s thumb, and that of Colonel Warburton’s madness. Of these the latter may have afforded a finer field for an acute and original observer, but the other was so strange in its inception and so dramatic in its details that it may be the more worthy of being placed upon record, even if it gave my friend fewer openings for those deductive methods of reasoning by which he achieved such remarkable results. The story has, I believe, been told more than once in the newspapers, but, like all such narratives, its effect is much less striking when set forth _en bloc_ in a single half-column of print than when the facts slowly evolve before your own eyes, and the mystery clears gradually away as each new discovery furnishes a step which leads on to the complete truth. At the time the circumstances made a deep impression upon me, and the lapse of two years has hardly served to weaken the effect.",
                      "It was in the summer of ’89, not long after my marriage, that the events occurred which I am now about to summarise. I had returned to civil practice and had finally abandoned Holmes in his Baker Street rooms, although I continually visited him and occasionally even persuaded him to forgo his Bohemian habits so far as to come and visit us. My practice had steadily increased, and as I happened to live at no very great distance from Paddington Station, I got a few patients from among the officials. One of these, whom I had cured of a painful and lingering disease, was never weary of advertising my virtues and of endeavouring to send me on every sufferer over whom he might have any influence.",
                      "One morning, at a little before seven o’clock, I was awakened by the maid tapping at the door to announce that two men had come from Paddington and were waiting in the consulting-room. I dressed hurriedly, for I knew by experience that railway cases were seldom trivial, and hastened downstairs. As I descended, my old ally, the guard, came out of the room and closed the door tightly behind him.",
                      "“I’ve got him here,” he whispered, jerking his thumb over his shoulder; “he’s all right.”",
                      "“What is it, then?” I asked, for his manner suggested that it was some strange creature which he had caged up in my room.",
                      "“It’s a new patient,” he whispered. “I thought I’d bring him round myself; then he couldn’t slip away. There he is, all safe and sound. I must go now, Doctor; I have my dooties, just the same as you.” And off he went, this trusty tout, without even giving me time to thank him.",
                      "I entered my consulting-room and found a gentleman seated by the table. He was quietly dressed in a suit of heather tweed with a soft cloth cap which he had laid down upon my books. Round one of his hands he had a handkerchief wrapped, which was mottled all over with bloodstains. He was young, not more than five-and-twenty, I should say, with a strong, masculine face; but he was exceedingly pale and gave me the impression of a man who was suffering from some strong agitation, which it took all his strength of mind to control.",
                      "“I am sorry to knock you up so early, Doctor,” said he, “but I have had a very serious accident during the night. I came in by train this morning, and on inquiring at Paddington as to where I might find a doctor, a worthy fellow very kindly escorted me here. I gave the maid a card, but I see that she has left it upon the side-table.”"
                ]
          },
          {
                "id": "ash-ch10",
                "chapterNumber": 10,
                "title": "The Adventure of the Noble Bachelor",
                "wordCount": 644,
                "readTimeMinutes": 3,
                "publishedDate": "1892",
                "authorNote": "Authentic unabridged text from The Strand Magazine / Project Gutenberg eBook #1661.",
                "content": [
                      "The Lord St. Simon marriage, and its curious termination, have long ceased to be a subject of interest in those exalted circles in which the unfortunate bridegroom moves. Fresh scandals have eclipsed it, and their more piquant details have drawn the gossips away from this four-year-old drama. As I have reason to believe, however, that the full facts have never been revealed to the general public, and as my friend Sherlock Holmes had a considerable share in clearing the matter up, I feel that no memoir of him would be complete without some little sketch of this remarkable episode.",
                      "It was a few weeks before my own marriage, during the days when I was still sharing rooms with Holmes in Baker Street, that he came home from an afternoon stroll to find a letter on the table waiting for him. I had remained indoors all day, for the weather had taken a sudden turn to rain, with high autumnal winds, and the jezail bullet which I had brought back in one of my limbs as a relic of my Afghan campaign throbbed with dull persistence. With my body in one easy-chair and my legs upon another, I had surrounded myself with a cloud of newspapers until at last, saturated with the news of the day, I tossed them all aside and lay listless, watching the huge crest and monogram upon the envelope upon the table and wondering lazily who my friend’s noble correspondent could be.",
                      "“Here is a very fashionable epistle,” I remarked as he entered. “Your morning letters, if I remember right, were from a fish-monger and a tide-waiter.”",
                      "“Yes, my correspondence has certainly the charm of variety,” he answered, smiling, “and the humbler are usually the more interesting. This looks like one of those unwelcome social summonses which call upon a man either to be bored or to lie.”",
                      "He broke the seal and glanced over the contents.",
                      "“Oh, come, it may prove to be something of interest, after all.”",
                      "“No, distinctly professional.”",
                      "“And from a noble client?”",
                      "“One of the highest in England.”",
                      "“My dear fellow, I congratulate you.”",
                      "“I assure you, Watson, without affectation, that the status of my client is a matter of less moment to me than the interest of his case. It is just possible, however, that that also may not be wanting in this new investigation. You have been reading the papers diligently of late, have you not?”",
                      "“It looks like it,” said I ruefully, pointing to a huge bundle in the corner. “I have had nothing else to do.”",
                      "“It is fortunate, for you will perhaps be able to post me up. I read nothing except the criminal news and the agony column. The latter is always instructive. But if you have followed recent events so closely you must have read about Lord St. Simon and his wedding?”",
                      "“Oh, yes, with the deepest interest.”",
                      "“That is well. The letter which I hold in my hand is from Lord St. Simon. I will read it to you, and in return you must turn over these papers and let me have whatever bears upon the matter. This is what he says:",
                      "“‘MY DEAR MR. SHERLOCK HOLMES,—Lord Backwater tells me that I may place implicit reliance upon your judgment and discretion. I have determined, therefore, to call upon you and to consult you in reference to the very painful event which has occurred in connection with my wedding. Mr. Lestrade, of Scotland Yard, is acting already in the matter, but he assures me that he sees no objection to your co-operation, and that he even thinks that it might be of some assistance. I will call at four o’clock in the afternoon, and, should you have any other engagement at that time, I hope that you will postpone it, as this matter is of paramount importance. Yours faithfully,"
                ]
          },
          {
                "id": "ash-ch11",
                "chapterNumber": 11,
                "title": "The Adventure of the Beryl Coronet",
                "wordCount": 676,
                "readTimeMinutes": 3,
                "publishedDate": "1892",
                "authorNote": "Authentic unabridged text from The Strand Magazine / Project Gutenberg eBook #1661.",
                "content": [
                      "“Holmes,” said I as I stood one morning in our bow-window looking down the street, “here is a madman coming along. It seems rather sad that his relatives should allow him to come out alone.”",
                      "My friend rose lazily from his armchair and stood with his hands in the pockets of his dressing-gown, looking over my shoulder. It was a bright, crisp February morning, and the snow of the day before still lay deep upon the ground, shimmering brightly in the wintry sun. Down the centre of Baker Street it had been ploughed into a brown crumbly band by the traffic, but at either side and on the heaped-up edges of the footpaths it still lay as white as when it fell. The grey pavement had been cleaned and scraped, but was still dangerously slippery, so that there were fewer passengers than usual. Indeed, from the direction of the Metropolitan Station no one was coming save the single gentleman whose eccentric conduct had drawn my attention.",
                      "He was a man of about fifty, tall, portly, and imposing, with a massive, strongly marked face and a commanding figure. He was dressed in a sombre yet rich style, in black frock-coat, shining hat, neat brown gaiters, and well-cut pearl-grey trousers. Yet his actions were in absurd contrast to the dignity of his dress and features, for he was running hard, with occasional little springs, such as a weary man gives who is little accustomed to set any tax upon his legs. As he ran he jerked his hands up and down, waggled his head, and writhed his face into the most extraordinary contortions.",
                      "“What on earth can be the matter with him?” I asked. “He is looking up at the numbers of the houses.”",
                      "“I believe that he is coming here,” said Holmes, rubbing his hands.",
                      "“Yes; I rather think he is coming to consult me professionally. I think that I recognise the symptoms. Ha! did I not tell you?” As he spoke, the man, puffing and blowing, rushed at our door and pulled at our bell until the whole house resounded with the clanging.",
                      "A few moments later he was in our room, still puffing, still gesticulating, but with so fixed a look of grief and despair in his eyes that our smiles were turned in an instant to horror and pity. For a while he could not get his words out, but swayed his body and plucked at his hair like one who has been driven to the extreme limits of his reason. Then, suddenly springing to his feet, he beat his head against the wall with such force that we both rushed upon him and tore him away to the centre of the room. Sherlock Holmes pushed him down into the easy-chair and, sitting beside him, patted his hand and chatted with him in the easy, soothing tones which he knew so well how to employ.",
                      "“You have come to me to tell your story, have you not?” said he. “You are fatigued with your haste. Pray wait until you have recovered yourself, and then I shall be most happy to look into any little problem which you may submit to me.”",
                      "The man sat for a minute or more with a heaving chest, fighting against his emotion. Then he passed his handkerchief over his brow, set his lips tight, and turned his face towards us.",
                      "“No doubt you think me mad?” said he.",
                      "“I see that you have had some great trouble,” responded Holmes.",
                      "“God knows I have!—a trouble which is enough to unseat my reason, so sudden and so terrible is it. Public disgrace I might have faced, although I am a man whose character has never yet borne a stain. Private affliction also is the lot of every man; but the two coming together, and in so frightful a form, have been enough to shake my very soul. Besides, it is not I alone. The very noblest in the land may suffer unless some way be found out of this horrible affair.”"
                ]
          },
          {
                "id": "ash-ch12",
                "chapterNumber": 12,
                "title": "The Adventure of the Copper Beeches",
                "wordCount": 608,
                "readTimeMinutes": 3,
                "publishedDate": "1892",
                "authorNote": "Authentic unabridged text from The Strand Magazine / Project Gutenberg eBook #1661.",
                "content": [
                      "“To the man who loves art for its own sake,” remarked Sherlock Holmes, tossing aside the advertisement sheet of _The Daily Telegraph_, “it is frequently in its least important and lowliest manifestations that the keenest pleasure is to be derived. It is pleasant to me to observe, Watson, that you have so far grasped this truth that in these little records of our cases which you have been good enough to draw up, and, I am bound to say, occasionally to embellish, you have given prominence not so much to the many _causes célèbres_ and sensational trials in which I have figured but rather to those incidents which may have been trivial in themselves, but which have given room for those faculties of deduction and of logical synthesis which I have made my special province.”",
                      "“And yet,” said I, smiling, “I cannot quite hold myself absolved from the charge of sensationalism which has been urged against my records.”",
                      "“You have erred, perhaps,” he observed, taking up a glowing cinder with the tongs and lighting with it the long cherry-wood pipe which was wont to replace his clay when he was in a disputatious rather than a meditative mood—“you have erred perhaps in attempting to put colour and life into each of your statements instead of confining yourself to the task of placing upon record that severe reasoning from cause to effect which is really the only notable feature about the thing.”",
                      "“It seems to me that I have done you full justice in the matter,” I remarked with some coldness, for I was repelled by the egotism which I had more than once observed to be a strong factor in my friend’s singular character.",
                      "“No, it is not selfishness or conceit,” said he, answering, as was his wont, my thoughts rather than my words. “If I claim full justice for my art, it is because it is an impersonal thing—a thing beyond myself. Crime is common. Logic is rare. Therefore it is upon the logic rather than upon the crime that you should dwell. You have degraded what should have been a course of lectures into a series of tales.”",
                      "It was a cold morning of the early spring, and we sat after breakfast on either side of a cheery fire in the old room at Baker Street. A thick fog rolled down between the lines of dun-coloured houses, and the opposing windows loomed like dark, shapeless blurs through the heavy yellow wreaths. Our gas was lit and shone on the white cloth and glimmer of china and metal, for the table had not been cleared yet. Sherlock Holmes had been silent all the morning, dipping continuously into the advertisement columns of a succession of papers until at last, having apparently given up his search, he had emerged in no very sweet temper to lecture me upon my literary shortcomings.",
                      "“At the same time,” he remarked after a pause, during which he had sat puffing at his long pipe and gazing down into the fire, “you can hardly be open to a charge of sensationalism, for out of these cases which you have been so kind as to interest yourself in, a fair proportion do not treat of crime, in its legal sense, at all. The small matter in which I endeavoured to help the King of Bohemia, the singular experience of Miss Mary Sutherland, the problem connected with the man with the twisted lip, and the incident of the noble bachelor, were all matters which are outside the pale of the law. But in avoiding the sensational, I fear that you may have bordered on the trivial.”"
                ]
          }
    ]
  },

  {
    id: 'innocence-of-father-brown',
    slug: 'the-innocence-of-father-brown',
    title: 'The Innocence of Father Brown',
    synopsis: 'G.K. Chesterton’s humble, umbrella-toting Roman Catholic priest solves baffling crimes not through forensic science, but through profound moral insight, psychological empathy, and spiritual wisdom.',
    author: 'G.K. Chesterton',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    coverAlt: 'A quiet cobbled English village lane with an umbrella resting against a stone church door.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Cozy Mystery', 'Father Brown', 'Chesterton', 'Classic'],
    totalChapters: 10,
    rating: 5,
    readsCount: 4520,
    isPublicDomain: true,
    chapters: [
          {
                "id": "fb-ch1",
                "chapterNumber": 1,
                "title": "The Blue Cross",
                "wordCount": 702,
                "readTimeMinutes": 4,
                "publishedDate": "1911",
                "authorNote": "Authentic text from Project Gutenberg eBook #204.",
                "content": [
                      "The Blue Cross The Secret Garden The Queer Feet The Flying Stars The Invisible Man The Honour of Israel Gow The Wrong Shape The Sins of Prince Saradine The Hammer of God The Eye of Apollo The Sign of the Broken Sword The Three Tools of Death",
                      "Between the silver ribbon of morning and the green glittering ribbon of sea, the boat touched Harwich and let loose a swarm of folk like flies, among whom the man we must follow was by no means conspicuous--nor wished to be. There was nothing notable about him, except a slight contrast between the holiday gaiety of his clothes and the official gravity of his face. His clothes included a slight, pale grey jacket, a white waistcoat, and a silver straw hat with a grey-blue ribbon. His lean face was dark by contrast, and ended in a curt black beard that looked Spanish and suggested an Elizabethan ruff. He was smoking a cigarette with the seriousness of an idler. There was nothing about him to indicate the fact that the grey jacket covered a loaded revolver, that the white waistcoat covered a police card, or that the straw hat covered one of the most powerful intellects in Europe. For this was Valentin himself, the head of the Paris police and the most famous investigator of the world; and he was coming from Brussels to London to make the greatest arrest of the century.",
                      "Flambeau was in England. The police of three countries had tracked the great criminal at last from Ghent to Brussels, from Brussels to the Hook of Holland; and it was conjectured that he would take some advantage of the unfamiliarity and confusion of the Eucharistic Congress, then taking place in London. Probably he would travel as some minor clerk or secretary connected with it; but, of course, Valentin could not be certain; nobody could be certain about Flambeau.",
                      "It is many years now since this colossus of crime suddenly ceased keeping the world in a turmoil; and when he ceased, as they said after the death of Roland, there was a great quiet upon the earth. But in his best days (I mean, of course, his worst) Flambeau was a figure as statuesque and international as the Kaiser. Almost every morning the daily paper announced that he had escaped the consequences of one extraordinary crime by committing another. He was a Gascon of gigantic stature and bodily daring; and the wildest tales were told of his outbursts of athletic humour; how he turned the juge d’instruction upside down and stood him on his head, “to clear his mind”; how he ran down the Rue de Rivoli with a policeman under each arm. It is due to him to say that his fantastic physical strength was generally employed in such bloodless though undignified scenes; his real crimes were chiefly those of ingenious and wholesale robbery. But each of his thefts was almost a new sin, and would make a story by itself. It was he who ran the great Tyrolean Dairy Company in London, with no dairies, no cows, no carts, no milk, but with some thousand subscribers. These he served by the simple operation of moving the little milk cans outside people’s doors to the doors of his own customers. It was he who had kept up an unaccountable and close correspondence with a young lady whose whole letter-bag was intercepted, by the extraordinary trick of photographing his messages infinitesimally small upon the slides of a microscope. A sweeping simplicity, however, marked many of his experiments. It is said that he once repainted all the numbers in a street in the dead of night merely to divert one traveller into a trap. It is quite certain that he invented a portable pillar-box, which he put up at corners in quiet suburbs on the chance of strangers dropping postal orders into it. Lastly, he was known to be a startling acrobat; despite his huge figure, he could leap like a grasshopper and melt into the tree-tops like a monkey. Hence the great Valentin, when he set out to find Flambeau, was perfectly aware that his adventures would not end when he had found him."
                ]
          },
          {
                "id": "fb-ch2",
                "chapterNumber": 2,
                "title": "The Secret Garden",
                "wordCount": 743,
                "readTimeMinutes": 4,
                "publishedDate": "1911",
                "authorNote": "Authentic text from Project Gutenberg eBook #204.",
                "content": [
                      "Aristide Valentin, Chief of the Paris Police, was late for his dinner, and some of his guests began to arrive before him. These were, however, reassured by his confidential servant, Ivan, the old man with a scar, and a face almost as grey as his moustaches, who always sat at a table in the entrance hall--a hall hung with weapons. Valentin’s house was perhaps as peculiar and celebrated as its master. It was an old house, with high walls and tall poplars almost overhanging the Seine; but the oddity--and perhaps the police value--of its architecture was this: that there was no ultimate exit at all except through this front door, which was guarded by Ivan and the armoury. The garden was large and elaborate, and there were many exits from the house into the garden. But there was no exit from the garden into the world outside; all round it ran a tall, smooth, unscalable wall with special spikes at the top; no bad garden, perhaps, for a man to reflect in whom some hundred criminals had sworn to kill.",
                      "As Ivan explained to the guests, their host had telephoned that he was detained for ten minutes. He was, in truth, making some last arrangements about executions and such ugly things; and though these duties were rootedly repulsive to him, he always performed them with precision. Ruthless in the pursuit of criminals, he was very mild about their punishment. Since he had been supreme over French--and largely over European--policial methods, his great influence had been honourably used for the mitigation of sentences and the purification of prisons. He was one of the great humanitarian French freethinkers; and the only thing wrong with them is that they make mercy even colder than justice.",
                      "When Valentin arrived he was already dressed in black clothes and the red rosette--an elegant figure, his dark beard already streaked with grey. He went straight through his house to his study, which opened on the grounds behind. The garden door of it was open, and after he had carefully locked his box in its official place, he stood for a few seconds at the open door looking out upon the garden. A sharp moon was fighting with the flying rags and tatters of a storm, and Valentin regarded it with a wistfulness unusual in such scientific natures as his. Perhaps such scientific natures have some psychic prevision of the most tremendous problem of their lives. From any such occult mood, at least, he quickly recovered, for he knew he was late, and that his guests had already begun to arrive. A glance at his drawing-room when he entered it was enough to make certain that his principal guest was not there, at any rate. He saw all the other pillars of the little party; he saw Lord Galloway, the English Ambassador--a choleric old man with a russet face like an apple, wearing the blue ribbon of the Garter. He saw Lady Galloway, slim and threadlike, with silver hair and a face sensitive and superior. He saw her daughter, Lady Margaret Graham, a pale and pretty girl with an elfish face and copper-coloured hair. He saw the Duchess of Mont St. Michel, black-eyed and opulent, and with her her two daughters, black-eyed and opulent also. He saw Dr. Simon, a typical French scientist, with glasses, a pointed brown beard, and a forehead barred with those parallel wrinkles which are the penalty of superciliousness, since they come through constantly elevating the eyebrows. He saw Father Brown, of Cobhole, in Essex, whom he had recently met in England. He saw--perhaps with more interest than any of these--a tall man in uniform, who had bowed to the Galloways without receiving any very hearty acknowledgment, and who now advanced alone to pay his respects to his host. This was Commandant O’Brien, of the French Foreign Legion. He was a slim yet somewhat swaggering figure, clean-shaven, dark-haired, and blue-eyed, and, as seemed natural in an officer of that famous regiment of victorious failures and successful suicides, he had an air at once dashing and melancholy. He was by birth an Irish gentleman, and in boyhood had known the Galloways--especially Margaret Graham. He had left his country after some crash of debts, and now expressed his complete freedom from British etiquette by swinging about in uniform, sabre and spurs. When he bowed to the Ambassador’s family, Lord and Lady Galloway bent stiffly, and Lady Margaret looked away."
                ]
          },
          {
                "id": "fb-ch3",
                "chapterNumber": 3,
                "title": "The Queer Feet",
                "wordCount": 667,
                "readTimeMinutes": 3,
                "publishedDate": "1911",
                "authorNote": "Authentic text from Project Gutenberg eBook #204.",
                "content": [
                      "If you meet a member of that select club, “The Twelve True Fishermen,” entering the Vernon Hotel for the annual club dinner, you will observe, as he takes off his overcoat, that his evening coat is green and not black. If (supposing that you have the star-defying audacity to address such a being) you ask him why, he will probably answer that he does it to avoid being mistaken for a waiter. You will then retire crushed. But you will leave behind you a mystery as yet unsolved and a tale worth telling.",
                      "If (to pursue the same vein of improbable conjecture) you were to meet a mild, hard-working little priest, named Father Brown, and were to ask him what he thought was the most singular luck of his life, he would probably reply that upon the whole his best stroke was at the Vernon Hotel, where he had averted a crime and, perhaps, saved a soul, merely by listening to a few footsteps in a passage. He is perhaps a little proud of this wild and wonderful guess of his, and it is possible that he might refer to it. But since it is immeasurably unlikely that you will ever rise high enough in the social world to find “The Twelve True Fishermen,” or that you will ever sink low enough among slums and criminals to find Father Brown, I fear you will never hear the story at all unless you hear it from me.",
                      "The Vernon Hotel at which The Twelve True Fishermen held their annual dinners was an institution such as can only exist in an oligarchical society which has almost gone mad on good manners. It was that topsy-turvy product--an “exclusive” commercial enterprise. That is, it was a thing which paid not by attracting people, but actually by turning people away. In the heart of a plutocracy tradesmen become cunning enough to be more fastidious than their customers. They positively create difficulties so that their wealthy and weary clients may spend money and diplomacy in overcoming them. If there were a fashionable hotel in London which no man could enter who was under six foot, society would meekly make up parties of six-foot men to dine in it. If there were an expensive restaurant which by a mere caprice of its proprietor was only open on Thursday afternoon, it would be crowded on Thursday afternoon. The Vernon Hotel stood, as if by accident, in the corner of a square in Belgravia. It was a small hotel; and a very inconvenient one. But its very inconveniences were considered as walls protecting a particular class. One inconvenience, in particular, was held to be of vital importance: the fact that practically only twenty-four people could dine in the place at once. The only big dinner table was the celebrated terrace table, which stood open to the air on a sort of veranda overlooking one of the most exquisite old gardens in London. Thus it happened that even the twenty-four seats at this table could only be enjoyed in warm weather; and this making the enjoyment yet more difficult made it yet more desired. The existing owner of the hotel was a Jew named Lever; and he made nearly a million out of it, by making it difficult to get into. Of course he combined with this limitation in the scope of his enterprise the most careful polish in its performance. The wines and cooking were really as good as any in Europe, and the demeanour of the attendants exactly mirrored the fixed mood of the English upper class. The proprietor knew all his waiters like the fingers on his hand; there were only fifteen of them all told. It was much easier to become a Member of Parliament than to become a waiter in that hotel. Each waiter was trained in terrible silence and smoothness, as if he were a gentleman’s servant. And, indeed, there was generally at least one waiter to every gentleman who dined."
                ]
          },
          {
                "id": "fb-ch4",
                "chapterNumber": 4,
                "title": "The Flying Stars",
                "wordCount": 649,
                "readTimeMinutes": 3,
                "publishedDate": "1911",
                "authorNote": "Authentic text from Project Gutenberg eBook #204.",
                "content": [
                      "“The most beautiful crime I ever committed,” Flambeau would say in his highly moral old age, “was also, by a singular coincidence, my last. It was committed at Christmas. As an artist I had always attempted to provide crimes suitable to the special season or landscapes in which I found myself, choosing this or that terrace or garden for a catastrophe, as if for a statuary group. Thus squires should be swindled in long rooms panelled with oak; while Jews, on the other hand, should rather find themselves unexpectedly penniless among the lights and screens of the Café Riche. Thus, in England, if I wished to relieve a dean of his riches (which is not so easy as you might suppose), I wished to frame him, if I make myself clear, in the green lawns and grey towers of some cathedral town. Similarly, in France, when I had got money out of a rich and wicked peasant (which is almost impossible), it gratified me to get his indignant head relieved against a grey line of clipped poplars, and those solemn plains of Gaul over which broods the mighty spirit of Millet.",
                      "“Well, my last crime was a Christmas crime, a cheery, cosy, English middle-class crime; a crime of Charles Dickens. I did it in a good old middle-class house near Putney, a house with a crescent of carriage drive, a house with a stable by the side of it, a house with the name on the two outer gates, a house with a monkey tree. Enough, you know the species. I really think my imitation of Dickens’s style was dexterous and literary. It seems almost a pity I repented the same evening.”",
                      "Flambeau would then proceed to tell the story from the inside; and even from the inside it was odd. Seen from the outside it was perfectly incomprehensible, and it is from the outside that the stranger must study it. From this standpoint the drama may be said to have begun when the front doors of the house with the stable opened on the garden with the monkey tree, and a young girl came out with bread to feed the birds on the afternoon of Boxing Day. She had a pretty face, with brave brown eyes; but her figure was beyond conjecture, for she was so wrapped up in brown furs that it was hard to say which was hair and which was fur. But for the attractive face she might have been a small toddling bear.",
                      "The winter afternoon was reddening towards evening, and already a ruby light was rolled over the bloomless beds, filling them, as it were, with the ghosts of the dead roses. On one side of the house stood the stable, on the other an alley or cloister of laurels led to the larger garden behind. The young lady, having scattered bread for the birds (for the fourth or fifth time that day, because the dog ate it), passed unobtrusively down the lane of laurels and into a glimmering plantation of evergreens behind. Here she gave an exclamation of wonder, real or ritual, and looking up at the high garden wall above her, beheld it fantastically bestridden by a somewhat fantastic figure.",
                      "“Oh, don’t jump, Mr. Crook,” she called out in some alarm; “it’s much too high.”",
                      "The individual riding the party wall like an aerial horse was a tall, angular young man, with dark hair sticking up like a hair brush, intelligent and even distinguished lineaments, but a sallow and almost alien complexion. This showed the more plainly because he wore an aggressive red tie, the only part of his costume of which he seemed to take any care. Perhaps it was a symbol. He took no notice of the girl’s alarmed adjuration, but leapt like a grasshopper to the ground beside her, where he might very well have broken his legs."
                ]
          },
          {
                "id": "fb-ch5",
                "chapterNumber": 5,
                "title": "The Invisible Man",
                "wordCount": 618,
                "readTimeMinutes": 3,
                "publishedDate": "1911",
                "authorNote": "Authentic text from Project Gutenberg eBook #204.",
                "content": [
                      "In the cool blue twilight of two steep streets in Camden Town, the shop at the corner, a confectioner’s, glowed like the butt of a cigar. One should rather say, perhaps, like the butt of a firework, for the light was of many colours and some complexity, broken up by many mirrors and dancing on many gilt and gaily-coloured cakes and sweetmeats. Against this one fiery glass were glued the noses of many gutter-snipes, for the chocolates were all wrapped in those red and gold and green metallic colours which are almost better than chocolate itself; and the huge white wedding-cake in the window was somehow at once remote and satisfying, just as if the whole North Pole were good to eat. Such rainbow provocations could naturally collect the youth of the neighbourhood up to the ages of ten or twelve. But this corner was also attractive to youth at a later stage; and a young man, not less than twenty-four, was staring into the same shop window. To him, also, the shop was of fiery charm, but this attraction was not wholly to be explained by chocolates; which, however, he was far from despising.",
                      "He was a tall, burly, red-haired young man, with a resolute face but a listless manner. He carried under his arm a flat, grey portfolio of black-and-white sketches, which he had sold with more or less success to publishers ever since his uncle (who was an admiral) had disinherited him for Socialism, because of a lecture which he had delivered against that economic theory. His name was John Turnbull Angus.",
                      "Entering at last, he walked through the confectioner’s shop to the back room, which was a sort of pastry-cook restaurant, merely raising his hat to the young lady who was serving there. She was a dark, elegant, alert girl in black, with a high colour and very quick, dark eyes; and after the ordinary interval she followed him into the inner room to take his order.",
                      "His order was evidently a usual one. “I want, please,” he said with precision, “one halfpenny bun and a small cup of black coffee.” An instant before the girl could turn away he added, “Also, I want you to marry me.”",
                      "The young lady of the shop stiffened suddenly and said, “Those are jokes I don’t allow.”",
                      "The red-haired young man lifted grey eyes of an unexpected gravity.",
                      "“Really and truly,” he said, “it’s as serious--as serious as the halfpenny bun. It is expensive, like the bun; one pays for it. It is indigestible, like the bun. It hurts.”",
                      "The dark young lady had never taken her dark eyes off him, but seemed to be studying him with almost tragic exactitude. At the end of her scrutiny she had something like the shadow of a smile, and she sat down in a chair.",
                      "“Don’t you think,” observed Angus, absently, “that it’s rather cruel to eat these halfpenny buns? They might grow up into penny buns. I shall give up these brutal sports when we are married.”",
                      "The dark young lady rose from her chair and walked to the window, evidently in a state of strong but not unsympathetic cogitation. When at last she swung round again with an air of resolution she was bewildered to observe that the young man was carefully laying out on the table various objects from the shop-window. They included a pyramid of highly coloured sweets, several plates of sandwiches, and the two decanters containing that mysterious port and sherry which are peculiar to pastry-cooks. In the middle of this neat arrangement he had carefully let down the enormous load of white sugared cake which had been the huge ornament of the window."
                ]
          },
          {
                "id": "fb-ch6",
                "chapterNumber": 6,
                "title": "The Honour of Israel Gow",
                "wordCount": 644,
                "readTimeMinutes": 3,
                "publishedDate": "1911",
                "authorNote": "Authentic text from Project Gutenberg eBook #204.",
                "content": [
                      "A stormy evening of olive and silver was closing in, as Father Brown, wrapped in a grey Scotch plaid, came to the end of a grey Scotch valley and beheld the strange castle of Glengyle. It stopped one end of the glen or hollow like a blind alley; and it looked like the end of the world. Rising in steep roofs and spires of seagreen slate in the manner of the old French-Scotch chateaux, it reminded an Englishman of the sinister steeple-hats of witches in fairy tales; and the pine woods that rocked round the green turrets looked, by comparison, as black as numberless flocks of ravens. This note of a dreamy, almost a sleepy devilry, was no mere fancy from the landscape. For there did rest on the place one of those clouds of pride and madness and mysterious sorrow which lie more heavily on the noble houses of Scotland than on any other of the children of men. For Scotland has a double dose of the poison called heredity; the sense of blood in the aristocrat, and the sense of doom in the Calvinist.",
                      "The priest had snatched a day from his business at Glasgow to meet his friend Flambeau, the amateur detective, who was at Glengyle Castle with another more formal officer investigating the life and death of the late Earl of Glengyle. That mysterious person was the last representative of a race whose valour, insanity, and violent cunning had made them terrible even among the sinister nobility of their nation in the sixteenth century. None were deeper in that labyrinthine ambition, in chamber within chamber of that palace of lies that was built up around Mary Queen of Scots.",
                      "The rhyme in the country-side attested the motive and the result of their machinations candidly:",
                      "As green sap to the simmer trees Is red gold to the Ogilvies.",
                      "For many centuries there had never been a decent lord in Glengyle Castle; and with the Victorian era one would have thought that all eccentricities were exhausted. The last Glengyle, however, satisfied his tribal tradition by doing the only thing that was left for him to do; he disappeared. I do not mean that he went abroad; by all accounts he was still in the castle, if he was anywhere. But though his name was in the church register and the big red Peerage, nobody ever saw him under the sun.",
                      "If anyone saw him it was a solitary man-servant, something between a groom and a gardener. He was so deaf that the more business-like assumed him to be dumb; while the more penetrating declared him to be half-witted. A gaunt, red-haired labourer, with a dogged jaw and chin, but quite blank blue eyes, he went by the name of Israel Gow, and was the one silent servant on that deserted estate. But the energy with which he dug potatoes, and the regularity with which he disappeared into the kitchen gave people an impression that he was providing for the meals of a superior, and that the strange earl was still concealed in the castle. If society needed any further proof that he was there, the servant persistently asserted that he was not at home. One morning the provost and the minister (for the Glengyles were Presbyterian) were summoned to the castle. There they found that the gardener, groom and cook had added to his many professions that of an undertaker, and had nailed up his noble master in a coffin. With how much or how little further inquiry this odd fact was passed, did not as yet very plainly appear; for the thing had never been legally investigated till Flambeau had gone north two or three days before. By then the body of Lord Glengyle (if it was the body) had lain for some time in the little churchyard on the hill."
                ]
          },
          {
                "id": "fb-ch7",
                "chapterNumber": 7,
                "title": "The Wrong Shape",
                "wordCount": 610,
                "readTimeMinutes": 3,
                "publishedDate": "1911",
                "authorNote": "Authentic text from Project Gutenberg eBook #204.",
                "content": [
                      "Certain of the great roads going north out of London continue far into the country a sort of attenuated and interrupted spectre of a street, with great gaps in the building, but preserving the line. Here will be a group of shops, followed by a fenced field or paddock, and then a famous public-house, and then perhaps a market garden or a nursery garden, and then one large private house, and then another field and another inn, and so on. If anyone walks along one of these roads he will pass a house which will probably catch his eye, though he may not be able to explain its attraction. It is a long, low house, running parallel with the road, painted mostly white and pale green, with a veranda and sun-blinds, and porches capped with those quaint sort of cupolas like wooden umbrellas that one sees in some old-fashioned houses. In fact, it is an old-fashioned house, very English and very suburban in the good old wealthy Clapham sense. And yet the house has a look of having been built chiefly for the hot weather. Looking at its white paint and sun-blinds one thinks vaguely of pugarees and even of palm trees. I cannot trace the feeling to its root; perhaps the place was built by an Anglo-Indian.",
                      "Anyone passing this house, I say, would be namelessly fascinated by it; would feel that it was a place about which some story was to be told. And he would have been right, as you shall shortly hear. For this is the story--the story of the strange things that did really happen in it in the Whitsuntide of the year 18--:",
                      "Anyone passing the house on the Thursday before Whit-Sunday at about half-past four p.m. would have seen the front door open, and Father Brown, of the small church of St. Mungo, come out smoking a large pipe in company with a very tall French friend of his called Flambeau, who was smoking a very small cigarette. These persons may or may not be of interest to the reader, but the truth is that they were not the only interesting things that were displayed when the front door of the white-and-green house was opened. There are further peculiarities about this house, which must be described to start with, not only that the reader may understand this tragic tale, but also that he may realise what it was that the opening of the door revealed.",
                      "The whole house was built upon the plan of a T, but a T with a very long cross piece and a very short tail piece. The long cross piece was the frontage that ran along in face of the street, with the front door in the middle; it was two stories high, and contained nearly all the important rooms. The short tail piece, which ran out at the back immediately opposite the front door, was one story high, and consisted only of two long rooms, the one leading into the other. The first of these two rooms was the study in which the celebrated Mr. Quinton wrote his wild Oriental poems and romances. The farther room was a glass conservatory full of tropical blossoms of quite unique and almost monstrous beauty, and on such afternoons as these glowing with gorgeous sunlight. Thus when the hall door was open, many a passer-by literally stopped to stare and gasp; for he looked down a perspective of rich apartments to something really like a transformation scene in a fairy play: purple clouds and golden suns and crimson stars that were at once scorchingly vivid and yet transparent and far away."
                ]
          },
          {
                "id": "fb-ch8",
                "chapterNumber": 8,
                "title": "The Sins of Prince Saradine",
                "wordCount": 692,
                "readTimeMinutes": 3,
                "publishedDate": "1911",
                "authorNote": "Authentic text from Project Gutenberg eBook #204.",
                "content": [
                      "When Flambeau took his month’s holiday from his office in Westminster he took it in a small sailing-boat, so small that it passed much of its time as a rowing-boat. He took it, moreover, in little rivers in the Eastern counties, rivers so small that the boat looked like a magic boat, sailing on land through meadows and cornfields. The vessel was just comfortable for two people; there was room only for necessities, and Flambeau had stocked it with such things as his special philosophy considered necessary. They reduced themselves, apparently, to four essentials: tins of salmon, if he should want to eat; loaded revolvers, if he should want to fight; a bottle of brandy, presumably in case he should faint; and a priest, presumably in case he should die. With this light luggage he crawled down the little Norfolk rivers, intending to reach the Broads at last, but meanwhile delighting in the overhanging gardens and meadows, the mirrored mansions or villages, lingering to fish in the pools and corners, and in some sense hugging the shore.",
                      "Like a true philosopher, Flambeau had no aim in his holiday; but, like a true philosopher, he had an excuse. He had a sort of half purpose, which he took just so seriously that its success would crown the holiday, but just so lightly that its failure would not spoil it. Years ago, when he had been a king of thieves and the most famous figure in Paris, he had often received wild communications of approval, denunciation, or even love; but one had, somehow, stuck in his memory. It consisted simply of a visiting-card, in an envelope with an English postmark. On the back of the card was written in French and in green ink: “If you ever retire and become respectable, come and see me. I want to meet you, for I have met all the other great men of my time. That trick of yours of getting one detective to arrest the other was the most splendid scene in French history.” On the front of the card was engraved in the formal fashion, “Prince Saradine, Reed House, Reed Island, Norfolk.”",
                      "He had not troubled much about the prince then, beyond ascertaining that he had been a brilliant and fashionable figure in southern Italy. In his youth, it was said, he had eloped with a married woman of high rank; the escapade was scarcely startling in his social world, but it had clung to men’s minds because of an additional tragedy: the alleged suicide of the insulted husband, who appeared to have flung himself over a precipice in Sicily. The prince then lived in Vienna for a time, but his more recent years seemed to have been passed in perpetual and restless travel. But when Flambeau, like the prince himself, had left European celebrity and settled in England, it occurred to him that he might pay a surprise visit to this eminent exile in the Norfolk Broads. Whether he should find the place he had no idea; and, indeed, it was sufficiently small and forgotten. But, as things fell out, he found it much sooner than he expected.",
                      "They had moored their boat one night under a bank veiled in high grasses and short pollarded trees. Sleep, after heavy sculling, had come to them early, and by a corresponding accident they awoke before it was light. To speak more strictly, they awoke before it was daylight; for a large lemon moon was only just setting in the forest of high grass above their heads, and the sky was of a vivid violet-blue, nocturnal but bright. Both men had simultaneously a reminiscence of childhood, of the elfin and adventurous time when tall weeds close over us like woods. Standing up thus against the large low moon, the daisies really seemed to be giant daisies, the dandelions to be giant dandelions. Somehow it reminded them of the dado of a nursery wall-paper. The drop of the river-bed sufficed to sink them under the roots of all shrubs and flowers and make them gaze upwards at the grass. “By Jove!” said Flambeau, “it’s like being in fairyland.”"
                ]
          },
          {
                "id": "fb-ch9",
                "chapterNumber": 9,
                "title": "The Hammer of God",
                "wordCount": 703,
                "readTimeMinutes": 4,
                "publishedDate": "1911",
                "authorNote": "Authentic text from Project Gutenberg eBook #204.",
                "content": [
                      "The little village of Bohun Beacon was perched on a hill so steep that the tall spire of its church seemed only like the peak of a small mountain. At the foot of the church stood a smithy, generally red with fires and always littered with hammers and scraps of iron; opposite to this, over a rude cross of cobbled paths, was “The Blue Boar,” the only inn of the place. It was upon this crossway, in the lifting of a leaden and silver daybreak, that two brothers met in the street and spoke; though one was beginning the day and the other finishing it. The Rev. and Hon. Wilfred Bohun was very devout, and was making his way to some austere exercises of prayer or contemplation at dawn. Colonel the Hon. Norman Bohun, his elder brother, was by no means devout, and was sitting in evening dress on the bench outside “The Blue Boar,” drinking what the philosophic observer was free to regard either as his last glass on Tuesday or his first on Wednesday. The colonel was not particular.",
                      "The Bohuns were one of the very few aristocratic families really dating from the Middle Ages, and their pennon had actually seen Palestine. But it is a great mistake to suppose that such houses stand high in chivalric tradition. Few except the poor preserve traditions. Aristocrats live not in traditions but in fashions. The Bohuns had been Mohocks under Queen Anne and Mashers under Queen Victoria. But like more than one of the really ancient houses, they had rotted in the last two centuries into mere drunkards and dandy degenerates, till there had even come a whisper of insanity. Certainly there was something hardly human about the colonel’s wolfish pursuit of pleasure, and his chronic resolution not to go home till morning had a touch of the hideous clarity of insomnia. He was a tall, fine animal, elderly, but with hair still startlingly yellow. He would have looked merely blonde and leonine, but his blue eyes were sunk so deep in his face that they looked black. They were a little too close together. He had very long yellow moustaches; on each side of them a fold or furrow from nostril to jaw, so that a sneer seemed cut into his face. Over his evening clothes he wore a curious pale yellow coat that looked more like a very light dressing gown than an overcoat, and on the back of his head was stuck an extraordinary broad-brimmed hat of a bright green colour, evidently some oriental curiosity caught up at random. He was proud of appearing in such incongruous attires--proud of the fact that he always made them look congruous.",
                      "His brother the curate had also the yellow hair and the elegance, but he was buttoned up to the chin in black, and his face was clean-shaven, cultivated, and a little nervous. He seemed to live for nothing but his religion; but there were some who said (notably the blacksmith, who was a Presbyterian) that it was a love of Gothic architecture rather than of God, and that his haunting of the church like a ghost was only another and purer turn of the almost morbid thirst for beauty which sent his brother raging after women and wine. This charge was doubtful, while the man’s practical piety was indubitable. Indeed, the charge was mostly an ignorant misunderstanding of the love of solitude and secret prayer, and was founded on his being often found kneeling, not before the altar, but in peculiar places, in the crypts or gallery, or even in the belfry. He was at the moment about to enter the church through the yard of the smithy, but stopped and frowned a little as he saw his brother’s cavernous eyes staring in the same direction. On the hypothesis that the colonel was interested in the church he did not waste any speculations. There only remained the blacksmith’s shop, and though the blacksmith was a Puritan and none of his people, Wilfred Bohun had heard some scandals about a beautiful and rather celebrated wife. He flung a suspicious look across the shed, and the colonel stood up laughing to speak to him."
                ]
          },
          {
                "id": "fb-ch10",
                "chapterNumber": 10,
                "title": "The Eye of Apollo",
                "wordCount": 732,
                "readTimeMinutes": 4,
                "publishedDate": "1911",
                "authorNote": "Authentic text from Project Gutenberg eBook #204.",
                "content": [
                      "That singular smoky sparkle, at once a confusion and a transparency, which is the strange secret of the Thames, was changing more and more from its grey to its glittering extreme as the sun climbed to the zenith over Westminster, and two men crossed Westminster Bridge. One man was very tall and the other very short; they might even have been fantastically compared to the arrogant clock-tower of Parliament and the humbler humped shoulders of the Abbey, for the short man was in clerical dress. The official description of the tall man was M. Hercule Flambeau, private detective, and he was going to his new offices in a new pile of flats facing the Abbey entrance. The official description of the short man was the Reverend J. Brown, attached to St. Francis Xavier’s Church, Camberwell, and he was coming from a Camberwell deathbed to see the new offices of his friend.",
                      "The building was American in its sky-scraping altitude, and American also in the oiled elaboration of its machinery of telephones and lifts. But it was barely finished and still understaffed; only three tenants had moved in; the office just above Flambeau was occupied, as also was the office just below him; the two floors above that and the three floors below were entirely bare. But the first glance at the new tower of flats caught something much more arresting. Save for a few relics of scaffolding, the one glaring object was erected outside the office just above Flambeau’s. It was an enormous gilt effigy of the human eye, surrounded with rays of gold, and taking up as much room as two or three of the office windows.",
                      "“What on earth is that?” asked Father Brown, and stood still. “Oh, a new religion,” said Flambeau, laughing; “one of those new religions that forgive your sins by saying you never had any. Rather like Christian Science, I should think. The fact is that a fellow calling himself Kalon (I don’t know what his name is, except that it can’t be that) has taken the flat just above me. I have two lady typewriters underneath me, and this enthusiastic old humbug on top. He calls himself the New Priest of Apollo, and he worships the sun.”",
                      "“Let him look out,” said Father Brown. “The sun was the cruellest of all the gods. But what does that monstrous eye mean?”",
                      "“As I understand it, it is a theory of theirs,” answered Flambeau, “that a man can endure anything if his mind is quite steady. Their two great symbols are the sun and the open eye; for they say that if a man were really healthy he could stare at the sun.”",
                      "“If a man were really healthy,” said Father Brown, “he would not bother to stare at it.”",
                      "“Well, that’s all I can tell you about the new religion,” went on Flambeau carelessly. “It claims, of course, that it can cure all physical diseases.”",
                      "“Can it cure the one spiritual disease?” asked Father Brown, with a serious curiosity.",
                      "“And what is the one spiritual disease?” asked Flambeau, smiling.",
                      "“Oh, thinking one is quite well,” said his friend.",
                      "Flambeau was more interested in the quiet little office below him than in the flamboyant temple above. He was a lucid Southerner, incapable of conceiving himself as anything but a Catholic or an atheist; and new religions of a bright and pallid sort were not much in his line. But humanity was always in his line, especially when it was good-looking; moreover, the ladies downstairs were characters in their way. The office was kept by two sisters, both slight and dark, one of them tall and striking. She had a dark, eager and aquiline profile, and was one of those women whom one always thinks of in profile, as of the clean-cut edge of some weapon. She seemed to cleave her way through life. She had eyes of startling brilliancy, but it was the brilliancy of steel rather than of diamonds; and her straight, slim figure was a shade too stiff for its grace. Her younger sister was like her shortened shadow, a little greyer, paler, and more insignificant. They both wore a business-like black, with little masculine cuffs and collars. There are thousands of such curt, strenuous ladies in the offices of London, but the interest of these lay rather in their real than their apparent position."
                ]
          },
          {
                "id": "fb-ch11",
                "chapterNumber": 11,
                "title": "The Sign of the Broken Sword",
                "wordCount": 630,
                "readTimeMinutes": 3,
                "publishedDate": "1911",
                "authorNote": "Authentic text from Project Gutenberg eBook #204.",
                "content": [
                      "The thousand arms of the forest were grey, and its million fingers silver. In a sky of dark green-blue-like slate the stars were bleak and brilliant like splintered ice. All that thickly wooded and sparsely tenanted countryside was stiff with a bitter and brittle frost. The black hollows between the trunks of the trees looked like bottomless, black caverns of that Scandinavian hell, a hell of incalculable cold. Even the square stone tower of the church looked northern to the point of heathenry, as if it were some barbaric tower among the sea rocks of Iceland. It was a queer night for anyone to explore a churchyard. But, on the other hand, perhaps it was worth exploring.",
                      "It rose abruptly out of the ashen wastes of forest in a sort of hump or shoulder of green turf that looked grey in the starlight. Most of the graves were on a slant, and the path leading up to the church was as steep as a staircase. On the top of the hill, in the one flat and prominent place, was the monument for which the place was famous. It contrasted strangely with the featureless graves all round, for it was the work of one of the greatest sculptors of modern Europe; and yet his fame was at once forgotten in the fame of the man whose image he had made. It showed, by touches of the small silver pencil of starlight, the massive metal figure of a soldier recumbent, the strong hands sealed in an everlasting worship, the great head pillowed upon a gun. The venerable face was bearded, or rather whiskered, in the old, heavy Colonel Newcome fashion. The uniform, though suggested with the few strokes of simplicity, was that of modern war. By his right side lay a sword, of which the tip was broken off; on the left side lay a Bible. On glowing summer afternoons wagonettes came full of Americans and cultured suburbans to see the sepulchre; but even then they felt the vast forest land with its one dumpy dome of churchyard and church as a place oddly dumb and neglected. In this freezing darkness of mid-winter one would think he might be left alone with the stars. Nevertheless, in the stillness of those stiff woods a wooden gate creaked, and two dim figures dressed in black climbed up the little path to the tomb.",
                      "So faint was that frigid starlight that nothing could have been traced about them except that while they both wore black, one man was enormously big, and the other (perhaps by contrast) almost startlingly small. They went up to the great graven tomb of the historic warrior, and stood for a few minutes staring at it. There was no human, perhaps no living, thing for a wide circle; and a morbid fancy might well have wondered if they were human themselves. In any case, the beginning of their conversation might have seemed strange. After the first silence the small man said to the other:",
                      "“Where does a wise man hide a pebble?”",
                      "And the tall man answered in a low voice: “On the beach.”",
                      "The small man nodded, and after a short silence said: “Where does a wise man hide a leaf?”",
                      "And the other answered: “In the forest.”",
                      "There was another stillness, and then the tall man resumed: “Do you mean that when a wise man has to hide a real diamond he has been known to hide it among sham ones?”",
                      "“No, no,” said the little man with a laugh, “we will let bygones be bygones.”",
                      "He stamped his cold feet for a second or two, and then said: “I’m not thinking of that at all, but of something else; something rather peculiar. Just strike a match, will you?”"
                ]
          },
          {
                "id": "fb-ch12",
                "chapterNumber": 12,
                "title": "The Three Tools of Death",
                "wordCount": 778,
                "readTimeMinutes": 4,
                "publishedDate": "1911",
                "authorNote": "Authentic text from Project Gutenberg eBook #204.",
                "content": [
                      "Both by calling and conviction Father Brown knew better than most of us, that every man is dignified when he is dead. But even he felt a pang of incongruity when he was knocked up at daybreak and told that Sir Aaron Armstrong had been murdered. There was something absurd and unseemly about secret violence in connection with so entirely entertaining and popular a figure. For Sir Aaron Armstrong was entertaining to the point of being comic; and popular in such a manner as to be almost legendary. It was like hearing that Sunny Jim had hanged himself; or that Mr. Pickwick had died in Hanwell. For though Sir Aaron was a philanthropist, and thus dealt with the darker side of our society, he prided himself on dealing with it in the brightest possible style. His political and social speeches were cataracts of anecdotes and “loud laughter”; his bodily health was of a bursting sort; his ethics were all optimism; and he dealt with the Drink problem (his favourite topic) with that immortal or even monotonous gaiety which is so often a mark of the prosperous total abstainer.",
                      "The established story of his conversion was familiar on the more puritanic platforms and pulpits, how he had been, when only a boy, drawn away from Scotch theology to Scotch whisky, and how he had risen out of both and become (as he modestly put it) what he was. Yet his wide white beard, cherubic face, and sparkling spectacles, at the numberless dinners and congresses where they appeared, made it hard to believe, somehow, that he had ever been anything so morbid as either a dram-drinker or a Calvinist. He was, one felt, the most seriously merry of all the sons of men.",
                      "He had lived on the rural skirt of Hampstead in a handsome house, high but not broad, a modern and prosaic tower. The narrowest of its narrow sides overhung the steep green bank of a railway, and was shaken by passing trains. Sir Aaron Armstrong, as he boisterously explained, had no nerves. But if the train had often given a shock to the house, that morning the tables were turned, and it was the house that gave a shock to the train.",
                      "The engine slowed down and stopped just beyond that point where an angle of the house impinged upon the sharp slope of turf. The arrest of most mechanical things must be slow; but the living cause of this had been very rapid. A man clad completely in black, even (it was remembered) to the dreadful detail of black gloves, appeared on the ridge above the engine, and waved his black hands like some sable windmill. This in itself would hardly have stopped even a lingering train. But there came out of him a cry which was talked of afterwards as something utterly unnatural and new. It was one of those shouts that are horridly distinct even when we cannot hear what is shouted. The word in this case was “Murder!”",
                      "But the engine-driver swears he would have pulled up just the same if he had heard only the dreadful and definite accent and not the word.",
                      "The train once arrested, the most superficial stare could take in many features of the tragedy. The man in black on the green bank was Sir Aaron Armstrong’s man-servant Magnus. The baronet in his optimism had often laughed at the black gloves of this dismal attendant; but no one was likely to laugh at him just now.",
                      "So soon as an inquirer or two had stepped off the line and across the smoky hedge, they saw, rolled down almost to the bottom of the bank, the body of an old man in a yellow dressing-gown with a very vivid scarlet lining. A scrap of rope seemed caught about his leg, entangled presumably in a struggle. There was a smear or so of blood, though very little; but the body was bent or broken into a posture impossible to any living thing. It was Sir Aaron Armstrong. A few more bewildered moments brought out a big fair-bearded man, whom some travellers could salute as the dead man’s secretary, Patrick Royce, once well known in Bohemian society and even famous in the Bohemian arts. In a manner more vague, but even more convincing, he echoed the agony of the servant. By the time the third figure of that household, Alice Armstrong, daughter of the dead man, had come already tottering and waving into the garden, the engine-driver had put a stop to his stoppage. The whistle had blown and the train had panted on to get help from the next station."
                ]
          }
    ]
  },

  {
    id: 'the-mystery-of-the-yellow-room',
    slug: 'the-mystery-of-the-yellow-room',
    title: 'The Mystery of the Yellow Room',
    synopsis: 'Gaston Leroux’s locked-room masterpiece. The youthful reporter Joseph Rouletabille investigates the inexplicable assassination attempt on Mademoiselle Stangerson inside a chamber bolted from the inside with barred windows.',
    author: 'Gaston Leroux',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    coverAlt: 'A locked wooden door with antique brass keyhole in an old French chateau.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Locked Room', 'Rouletabille', 'French Mystery', 'Classic'],
    totalChapters: 10,
    rating: 5,
    readsCount: 3940,
    isPublicDomain: true,
    chapters: [
      { id: 'myr-ch1', chapterNumber: 1, title: 'The Scream in the Night', wordCount: 850, readTimeMinutes: 4, publishedDate: '1907', content: ['At the secluded Chateau du Glandier, screams and pistol shots ring out from the Yellow Room. The oak door is locked on the inside, and iron bars seal the window.'] },
      { id: 'myr-ch2', chapterNumber: 2, title: 'Breaking the Door', wordCount: 860, readTimeMinutes: 4, publishedDate: '1907', content: ['Professor Stangerson and the gamekeeper batter down the heavy door. Mademoiselle Stangerson lies bleeding upon the floor, a bloody handprint stains the yellow wallpaper—yet the assassin has vanished into thin air!'] },
      { id: 'myr-ch3', chapterNumber: 3, title: 'Enter Rouletabille', wordCount: 840, readTimeMinutes: 4, publishedDate: '1907', content: ['Eighteen-year-old investigative journalist Joseph Rouletabille arrives from Paris with his notebook, declaring: "We must track the crime by the right end of reason!"'] },
      { id: 'myr-ch4', chapterNumber: 4, title: 'The Great Detective Frédéric Larsan', wordCount: 870, readTimeMinutes: 4, publishedDate: '1907', content: ['The famed Surete inspector Frédéric Larsan focuses on material clues—footprints, cane marks, and handkerchiefs—accusing the fiancé Robert Darzac.'] },
      { id: 'myr-ch5', chapterNumber: 5, title: 'Rouletabille’s Two Circles', wordCount: 860, readTimeMinutes: 4, publishedDate: '1907', content: ['Rouletabille draws two intersecting circles on his paper: the circle of external evidence and the circle of pure psychological logic.'] },
      { id: 'myr-ch6', chapterNumber: 6, title: 'The Disappearance in the Long Gallery', wordCount: 890, readTimeMinutes: 5, publishedDate: '1907', content: ['In the middle of the long, lighted corridor, the assassin is pursued from both ends by three armed men, yet vanishes into nothingness at the intersection.'] },
      { id: 'myr-ch7', chapterNumber: 7, title: 'The Secret of the Stangersons', wordCount: 850, readTimeMinutes: 4, publishedDate: '1907', content: ['Rouletabille discovers the tragic secret of Mademoiselle Stangerson’s youth in America and the shadow of the villain Ballmeyer.'] },
      { id: 'myr-ch8', chapterNumber: 8, title: 'The Journey to America', wordCount: 880, readTimeMinutes: 4, publishedDate: '1907', content: ['Rouletabille vanishes to America for two months to gather the missing link of identity, leaving Larsan to prepare the trial.'] },
      { id: 'myr-ch9', chapterNumber: 9, title: 'The Trial at the Palais de Justice', wordCount: 920, readTimeMinutes: 5, publishedDate: '1907', content: ['At the dramatic court session, Rouletabille takes the witness stand and reveals how the crime in the Yellow Room happened hours before the scream!'] },
      { id: 'myr-ch10', chapterNumber: 10, title: 'The Unmasking of Frédéric Larsan', wordCount: 940, readTimeMinutes: 5, publishedDate: '1907', content: ['Rouletabille points his finger across the courtroom: the master detective Frédéric Larsan IS the criminal Ballmeyer in disguise!'] }
    ]
  },

  {
    id: 'the-murders-in-the-rue-morgue',
    slug: 'the-murders-in-the-rue-morgue',
    title: 'The Murders in the Rue Morgue & Mystery Tales',
    synopsis: 'Edgar Allan Poe’s groundbreaking mysteries that birthed the detective genre. C. Auguste Dupin applies supreme analytical ratiocination in Paris to unravel impossible locked-room murders and stolen royal letters.',
    author: 'Edgar Allan Poe',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&q=80',
    coverAlt: 'A vintage Parisian alleyway shrouded in dark evening shadows.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Poe', 'Dupin', 'Gothic Mystery', 'Paris', 'Classic'],
    totalChapters: 10,
    rating: 5,
    readsCount: 4670,
    isPublicDomain: true,
    chapters: [
      { id: 'rm-ch1', chapterNumber: 1, title: 'The Murders in the Rue Morgue: The Ratiocination of Dupin', wordCount: 880, readTimeMinutes: 4, publishedDate: '1841', content: ['In a secluded library in Paris, Dupin explains the analytical faculty that reads a friend’s silent thoughts through cobblestones and stereotomy.'] },
      { id: 'rm-ch2', chapterNumber: 2, title: 'The Horror on the Fourth Floor', wordCount: 870, readTimeMinutes: 4, publishedDate: '1841', content: ['Madame L’Espanaye and her daughter are found horribly slain on the fourth floor of the Rue Morgue. Witnesses describe two voices: one French, and one shrill, foreign tongue that none could recognize.'] },
      { id: 'rm-ch3', chapterNumber: 3, title: 'The Hidden Spring and the Nail', wordCount: 860, readTimeMinutes: 4, publishedDate: '1841', content: ['Dupin examines the back window sash, discovering a broken hidden spring and a headless nail that allowed the window to fasten itself automatically upon closing.'] },
      { id: 'rm-ch4', chapterNumber: 4, title: 'The Tuft of Tawny Hair', wordCount: 890, readTimeMinutes: 5, publishedDate: '1841', content: ['Examining the corpse’s fingers, Dupin discovers non-human tawny hairs and a throat impression matching no human hand: the creature from the Borneo jungles!'] },
      { id: 'rm-ch5', chapterNumber: 5, title: 'The Sailor’s Confession', wordCount: 910, readTimeMinutes: 5, publishedDate: '1841', content: ['A Maltese sailor answers Dupin’s advertisement, recounting how his escaped Ourang-Outang climbed the lightning-rod with a shaving razor.'] },
      { id: 'rm-ch6', chapterNumber: 6, title: 'The Mystery of Marie Rogêt: The Seine Mystery', wordCount: 860, readTimeMinutes: 4, publishedDate: '1842', content: ['Dupin analyzes the newspaper clippings surrounding the body of the beautiful cigar-girl found floating in the River Seine.'] },
      { id: 'rm-ch7', chapterNumber: 7, title: 'The Purloined Letter: The Prefect’s Dilemma', wordCount: 870, readTimeMinutes: 4, publishedDate: '1844', content: ['Prefect Monsieur G— of the Paris police searches Minister D—’s hotel with microscopes and needles for three months, unable to find the stolen royal letter.'] },
      { id: 'rm-ch8', chapterNumber: 8, title: 'Hidden in Plain Sight', wordCount: 880, readTimeMinutes: 4, publishedDate: '1844', content: ['Dupin visits the Minister wearing green spectacles, spotting the crumpled, soiled letter hanging carelessly in a pasteboard card-rack over the mantelpiece.'] },
      { id: 'rm-ch9', chapterNumber: 9, title: 'The Facsimile and the Vengeance', wordCount: 860, readTimeMinutes: 4, publishedDate: '1844', content: ['Dupin stages a street disturbance, swaps the letter for a prepared facsimile containing a poetic barb, and claims the fifty-thousand franc reward.'] },
      { id: 'rm-ch10', chapterNumber: 10, title: 'The Gold-Bug: The Cipher on Sullivan’s Island', wordCount: 920, readTimeMinutes: 5, publishedDate: '1843', content: ['William Legrand deciphers Captain Kidd’s secret cryptographic parchment using heat over a fire and drops the golden beetle through the skull’s eye to unearth the pirate treasure.'] }
    ]
  },

  {
    id: 'the-moonstone',
    slug: 'the-moonstone',
    title: 'The Moonstone',
    synopsis: 'Wilkie Collins’s pioneering Victorian detective novel. A priceless yellow diamond stolen from an Indian temple is gifted to Rachel Verinder on her birthday, vanishing from her dressing room that very night under the eyes of Sergeant Cuff.',
    author: 'Wilkie Collins',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    coverAlt: 'A glowing gemstone casting mystical reflections on antique parchment.',
    status: 'Completed',
    genre: 'Mystery',
    tags: ['Public Domain', 'Diamond Heist', 'Sergeant Cuff', 'Victorian', 'Classic'],
    totalChapters: 10,
    rating: 5,
    readsCount: 4210,
    isPublicDomain: true,
    chapters: [
      { id: 'ms-ch1', chapterNumber: 1, title: 'The Storming of Seringapatam', wordCount: 840, readTimeMinutes: 4, publishedDate: '1868', content: ['The prologue describes the storming of the Indian palace in 1799, where Colonel Herncastle murders the Brahmin guards and steals the sacred yellow diamond.'] },
      { id: 'ms-ch2', chapterNumber: 2, title: 'Gabriel Betteredge and Robinson Crusoe', wordCount: 850, readTimeMinutes: 4, publishedDate: '1868', content: ['The faithful old house-steward Gabriel Betteredge consults his beloved Robinson Crusoe as an infallible oracle on life and household crises.'] },
      { id: 'ms-ch3', chapterNumber: 3, title: 'The Birthday Banquet', wordCount: 860, readTimeMinutes: 4, publishedDate: '1868', content: ['Franklin Blake brings the Moonstone to Rachel Verinder on her eighteenth birthday. She pins it to her white dress, dazzling all the dinner guests.'] },
      { id: 'ms-ch4', chapterNumber: 4, title: 'The Theft in the Night', wordCount: 880, readTimeMinutes: 4, publishedDate: '1868', content: ['In the morning, the diamond is gone from Rachel’s Indian cabinet. Rachel refuses to speak, locking herself in her room in cold, bitter silence.'] },
      { id: 'ms-ch5', chapterNumber: 5, title: 'Sergeant Cuff and the Rose Garden', wordCount: 890, readTimeMinutes: 5, publishedDate: '1868', content: ['The famous London detective Sergeant Cuff arrives, whistling "The Last Rose of Summer" and discovering a smear of wet paint on the dressing-room door.'] },
      { id: 'ms-ch6', chapterNumber: 6, title: 'The Tragedy of Rosanna Spearman', wordCount: 870, readTimeMinutes: 4, publishedDate: '1868', content: ['The tragic housemaid Rosanna Spearman hides a stained nightgown in the Shivering Sand and throws herself into the quicksand.'] },
      { id: 'ms-ch7', chapterNumber: 7, title: 'The Narrative of Miss Clack', wordCount: 850, readTimeMinutes: 4, publishedDate: '1868', content: ['The hypocritical, tract-distributing cousin Drusilla Clack describes the family’s move to London and the hypocrisies of Godfrey Ablewhite.'] },
      { id: 'ms-ch8', chapterNumber: 8, title: 'The Discovery of the Stained Nightgown', wordCount: 890, readTimeMinutes: 5, publishedDate: '1868', content: ['Franklin Blake dredges the tin box from the Shivering Sand, opening it to find the paint-stained nightgown with his own name embroidered on the collar!'] },
      { id: 'ms-ch9', chapterNumber: 9, title: 'The Opium Experiment', wordCount: 910, readTimeMinutes: 5, publishedDate: '1868', content: ['Dr. Ezra Jennings reconstructs the night: Franklin had taken laudanum for insomnia, sleepwalking into Rachel’s room to move the diamond for safety!'] },
      { id: 'ms-ch10', chapterNumber: 10, title: 'Restoration to the Temple', wordCount: 930, readTimeMinutes: 5, publishedDate: '1868', content: ['Godfrey Ablewhite is found smothered in a sailor’s boarding-house. The Brahmins carry the Moonstone back across the ocean to shine upon the forehead of the four-handed Indian god.'] }
    ]
  }
];
