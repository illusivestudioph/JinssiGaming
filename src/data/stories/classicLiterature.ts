import type { Story } from '../stories';

export const classicLiteratureBooks: Story[] = [
  {
    id: 'the-secret-garden',
    slug: 'the-secret-garden',
    title: 'The Secret Garden',
    synopsis: 'Orphaned Mary Lennox is sent to live in a brooding Yorkshire manor. Guided by a curious robin and a buried brass key, she unearths an overgrown, locked garden that slowly blooms alongside her own healing spirit and friendship with Dickon and Colin.',
    author: 'Frances Hodgson Burnett',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
    coverAlt: 'A sunlit stone archway covered in climbing ivy leading into a quiet hidden garden.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Gardening', 'Healing', 'Nature', 'Yorkshire', 'Comfort Read'],
    totalChapters: 15,
    rating: 5,
    readsCount: 4820,
    isPublicDomain: true,
    chapters: [
      {
        id: 'sg-ch1',
        chapterNumber: 1,
        title: 'There is No One Left',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'The classic beginning of Mary Lennox arriving in Yorkshire.',
        content: [
          'When Mary Lennox was sent to Misselthwaite Manor to live with her uncle, everybody said she was the most disagreeable-looking child ever seen. It was true, too. She had a little thin face and a little thin body, thin light hair and a sour expression.',
          'Her hair was yellow, and her face was yellow because she had been born in India and had always been ill in one way or another. Her father had held a position under the English Government and had always been busy, while her mother was a great beauty who cared only for parties.',
          'And then, on that strange morning when she awoke, the bungalow was hushed. The servants had vanished, the air hung heavy and motionless, and a profound silence had fallen over the courtyard where the green leaves drooped under the Indian sun.',
          'She was alone in the world, and within a week was on a steamship crossing the cold northern seas toward England and the great brooding estate on the Yorkshire moors.'
        ]
      },
      {
        id: 'sg-ch2',
        chapterNumber: 2,
        title: 'Mistress Mary Quite Contrary',
        wordCount: 790,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'Mary arrives in London and is met by Mrs. Medlock.',
        content: [
          'Mary had liked to look at her mother from a distance, and she had thought her very pretty, but she knew very little of her, so she could scarcely be expected to love her or miss her very much.',
          'The children at the English vicar’s house where she stayed temporarily called her "Mistress Mary Quite Contrary" because she sat alone in a sandy corner, pushing sticks into the earth and singing nursery rhymes with a haughty scowl.',
          '"Mistress Mary, quite contrary, how does your garden grow? With silver bells and cockle shells, and marigolds all in a row."',
          'When Mrs. Medlock arrived to take her to Yorkshire, she looked down at Mary’s sour face and sighed. "Well, she’s not much to look at," said the housekeeper. "And her uncle won’t bother his head about her, that’s certain."'
        ]
      },
      {
        id: 'sg-ch3',
        chapterNumber: 3,
        title: 'Across the Moor',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'The atmospheric journey across the endless heather moors in the dark of night.',
        content: [
          'She had traveled through the afternoon on a railway train, looking out the carriage window at gray skies and flat pastures. Beside her sat Mrs. Medlock, the housekeeper of Misselthwaite Manor, wearing a heavy purple mantle that smelled faintly of camphor.',
          '"You need not expect to see much of your uncle, child," Mrs. Medlock had warned, smoothing her black gloves. "Mr. Archibald Craven has a crooked back and a shut-in heart. The house has nearly a hundred rooms, and most of them have stayed locked for ten years."',
          'At the station, a brougham carriage waited for them. Outside, the world had dissolved into an ink-dark ocean of wind. The horse hooves clattered against stone roads, and then the road ended.',
          '"What is this great wild place?" Mary asked, pressing her nose against the chilled glass.',
          '"That’s the moor, my dear," said Mrs. Medlock. "Miles upon miles of wild land where nothing grows but heather and gorse and broom, and nothing lives but wild ponies and sheep."'
        ]
      },
      {
        id: 'sg-ch4',
        chapterNumber: 4,
        title: 'Martha and the Hearth Fire',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'Mary wakes to the broad Yorkshire dialect of cheerful housemaid Martha.',
        content: [
          'When she opened her eyes in the morning it was because a young housemaid had come into her room to make the fire and was kneeling on the hearth-rug raking out the cinders.',
          'Mary sat up and stared at her. The girl had a round, rosy face, cheerful snub nose, and twinkling brown eyes. Her name was Martha, and she spoke with a broad, musical Yorkshire accent that sounded like a brook running over pebbles.',
          '"Eh! Art tha awake?" she asked cheerfully. "The moor is blowin’ a gale today! It’s grand out there when the wind gets up and blows the cobwebs out of your head."',
          'Mary watched her dress the hearth with kindling. In India, five servants would have dressed her without her lifting a finger. "Who is going to dress me?" she demanded.',
          'Martha sat back on her heels and gasped with laughter. "Can’t tha dress thysel’?" she cried. "Our Dickon was dressing himself and half the young ones by the time he was five!"'
        ]
      },
      {
        id: 'sg-ch5',
        chapterNumber: 5,
        title: 'The Cry in the Corridor',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1911',
        authorNote: 'A mysterious sound echoes down the tapestry-lined halls of Misselthwaite.',
        content: [
          'At first each day which passed by for Mary Lennox was exactly like the others. Every morning she awoke in her tapestried room and found Martha kneeling by the hearth; every morning she ate her porridge and bread and marmalade.',
          'Then she wrapped herself in her wool coat and walked in the gardens, counting the walled fruit grounds and the stone urns where dry brown creepers hung.',
          'One rainy evening, while the storm raged against the stone turrets and rattled the leaded panes, Mary sat in the library reading an old book of fairy tales.',
          'Suddenly, beneath the whistling of the wind down the great chimney, she heard another sound. It was distant, thin, and sorrowful—a child crying somewhere deep within the locked corridors of the hundred rooms.',
          'She stepped out into the dark hallway, holding a brass candlestick, her heart beating fast against her ribs.'
        ]
      },
      {
        id: 'sg-ch6',
        chapterNumber: 6,
        title: 'There Was Someone Crying',
        wordCount: 810,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'Mrs. Medlock furiously turns Mary back from the forbidden wing.',
        content: [
          'The corridor was long and dark, and the wind shook the heavy tapestry so that the woven huntsmen and horses seemed to leap in the flickering candle flame.',
          'Mary crept forward on tiptoe. The crying grew clearer—it was not a dream, and it was not a dog howling on the moor. It was the fretful, sobbing cry of a boy.',
          'She reached a heavy carved oak door at the end of the gallery. Before she could touch the handle, a quick step sounded behind her and Mrs. Medlock grabbed her arm with trembling anger.',
          '"What are you doing here, Miss Mary?" the housekeeper snapped, her bonnet ribbons quivering. "Didn’t I tell you never to go wandering about the corridors? Back to your room this instant, or I shall lock you in!"'
        ]
      },
      {
        id: 'sg-ch7',
        chapterNumber: 7,
        title: 'The Key of the Garden',
        wordCount: 920,
        readTimeMinutes: 5,
        publishedDate: '1911',
        authorNote: 'The friendly robin helps Mary discover the rusted key buried for ten years.',
        content: [
          'Two days after the rain cleared, the Yorkshire air was crisp and smelled of damp earth and awakening moss. Mary walked through the kitchen gardens, past the orchards and cold frames, until she came upon an extraordinarily long wall covered in thick, dark winter ivy.',
          'High above the wall, a cheerful chirp broke the quiet. On the branch of an apple tree sat a little robin redbreast, with bright black eyes and a breast like an autumn leaf.',
          'He tilted his head, watching her as if he understood every unspoken question in her mind. He hopped from the branch down into a bed of turned soil where a dog had been digging.',
          'Mary stepped softly toward the bird. As she did, something half-buried in the moist black loam caught the slant of the morning sun. It was an iron ring, rusted and caked with dried clay.',
          'She knelt down, her fingers sinking into the cold soil. When she pulled it free, she felt the heavy, notched weight of an antique brass key. It had been buried in the ground for ten years.'
        ]
      },
      {
        id: 'sg-ch8',
        chapterNumber: 8,
        title: 'The Robin Who Showed the Way',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'A gust of moor wind pulls aside the ivy to reveal the secret door.',
        content: [
          'She looked at the key in her hand with a pounding heart. "It must be the key to the garden," she whispered to herself. "If it has been buried ten years, it must be the key Mr. Craven buried when his wife died."',
          'She went back to the ivy-covered wall. The robin had flown to the top of it and was perched there, bobbing his tail and trilling his joyful song.',
          'Then a strong gust of moorland wind blew through the trees. It caught a heavy curtain of trailing ivy and swung it aside like a green tapestry.',
          'Beneath the vines, set flush into the weathered gray stone, was an old wooden door with an iron keyhole. Mary’s breath caught. She slipped the brass key into the lock. It turned smoothly with a heavy, satisfying click.'
        ]
      },
      {
        id: 'sg-ch9',
        chapterNumber: 9,
        title: 'The Strangest House',
        wordCount: 940,
        readTimeMinutes: 5,
        publishedDate: '1911',
        authorNote: 'Mary steps inside the secret world of dormant roses and sleeping arches.',
        content: [
          'She pushed the door slowly open and slipped inside, shutting it behind her. She stood inside the secret garden.',
          'It was the sweetest, most mysterious-looking place anyone could imagine. The high walls were covered with leafless rose stems that climbed up and hung down in curtains of gray web. There were stone benches, paths covered with soft green moss, and alcoves carved into ancient yew hedges.',
          'Everything looked brown and asleep. "Is it all dead?" Mary wondered aloud, walking lightly on the velvety turf.',
          'She knelt beside a stone border and brushed aside a mat of dead leaves. There, poking through the rich dark soil, were sharp little green spears of newly awakened bulbs.',
          '"They are not dead!" she cried joyfully. "They are crocuses and snowdrops and daffodils waking up under the earth!"'
        ]
      },
      {
        id: 'sg-ch10',
        chapterNumber: 10,
        title: 'Dickon, the Moor Boy',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1911',
        authorNote: 'Mary meets Martha’s brother Dickon, who charms wild animals with his pipe.',
        content: [
          'The next day Mary was in the orchard when she heard a low, sweet piping sound coming from a clump of birch trees near the hedge.',
          'She crept forward and parted the branches. Sitting against the trunk of an oak tree was a boy of about twelve, with wide laughing blue eyes and cheeks as red as rowan berries.',
          'Around him, entirely unafraid, clustered two wild brown rabbits, a crow named Soot, and a young red fox kit that nuzzled his woolen knee.',
          'He held a wooden pipe to his lips, playing strange, comforting moorland melodies. As Mary stepped out, the animals stirred, but Dickon raised a gentle brown hand. "Don’t thee move quick," he said softly in broad Yorkshire. "They won’t fear thee if thou art quiet as a mouse."'
        ]
      },
      {
        id: 'sg-ch11',
        chapterNumber: 11,
        title: 'The Nest of the Missel Thrush',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'Mary trusts Dickon with the secret of the hidden garden.',
        content: [
          'Mary had never trusted a human creature in her eleven years of life, but looking at Dickon’s kind eyes and gentle hands, her secret burst from her lips.',
          '"Can you keep a secret?" she asked, leaning close. "A great, wonderful secret that nobody on the whole moor knows?"',
          'Dickon smiled, tucking the fox kit under his arm. "Aye, Mary," he said. "I can keep secrets better than the missel thrush keeps her nest. If a bird trusts me with four blue eggs, I wouldn’t tell a soul where they lay."',
          '"Then come with me," Mary whispered, leading him by the hand to the ivy-covered wall. She pushed aside the curtain of leaves, turned the key, and ushered him inside the hidden paradise.'
        ]
      },
      {
        id: 'sg-ch12',
        chapterNumber: 12,
        title: 'Might I Have a Bit of Earth?',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1911',
        authorNote: 'Mary meets her reclusive uncle Archibald Craven for the first time.',
        content: [
          'That evening Mary was summoned to the grand library. Mr. Archibald Craven sat in a high-backed armchair beside the fire. His dark hair was streaked with silver and his shoulders were bowed with sorrow.',
          'He looked at Mary with weary, haunted eyes. "You look very thin, child," he said softly. "Are you well? Is there anything you wish for here in this great dreary house?"',
          'Mary’s hands clenched into her wool skirt. She thought of the little green shoots waking under the spring sun.',
          '"Might I have a bit of earth, uncle?" she asked timidly. "To make things grow—to plant seeds and make a little garden of my own?"',
          'A gentle look passed across Mr. Craven’s sad face. "A bit of earth," he murmured. "Take as much earth as you want, child. Play out of doors and grow strong."'
        ]
      },
      {
        id: 'sg-ch13',
        chapterNumber: 13,
        title: 'I Am Colin',
        wordCount: 930,
        readTimeMinutes: 5,
        publishedDate: '1911',
        authorNote: 'Mary discovers her invalid cousin Colin hidden away in the grand bedroom.',
        content: [
          'That night the wind screamed over the rooftop like a wild beast. Unable to sleep, Mary got out of bed and followed the unmistakable sound of weeping down the drafty corridor.',
          'She pushed open the heavy door at the end of the hallway. Inside was a magnificent bedchamber hung with crimson damask. In the center stood an antique four-poster bed draped in silk curtains.',
          'Lying among the pillows was a boy with dark hair and huge, luminous gray eyes. His face was pale as ivory and wet with tears.',
          'He stared at Mary in astonished disbelief. "Are you a ghost?" he asked in a shaky voice.',
          '"No," Mary said, walking right up to the bed. "I am Mary Lennox. Who are you?"',
          '"I am Colin Craven," the boy answered, pulling his velvet coverlet up. "This is my father’s house, and everyone obeys me. If I get out of bed, I shall get a hunch on my back and die."'
        ]
      },
      {
        id: 'sg-ch14',
        chapterNumber: 14,
        title: 'A Young Rajah',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1911',
        authorNote: 'Mary refuses to let Colin wallow in tantrums and tells him about spring.',
        content: [
          'Colin was accustomed to everyone whispering around him, walking on tiptoe, and giving him his own way whenever he threw screaming fits.',
          'Mary Lennox had been an ill-tempered tyrant herself in India, so Colin’s tantrums did not impress her in the slightest.',
          '"You won’t die!" she said boldly, sitting right on the edge of his mattress. "You’re just pale because you stay shut in this stuffy room with the curtains drawn. Dickon runs on the moor all day and drinks sweet milk, and his cheeks are red as cherries."',
          'Colin stopped crying and listened with wide eyes. "Who is Dickon?" he asked, fascinated.',
          'For two hours Mary described the moor, the waking heather, the singing thrushes, and the little green shoots pushing up through the damp black earth.'
        ]
      },
      {
        id: 'sg-ch15',
        chapterNumber: 15,
        title: 'Nest Building & The Magic Awakens',
        wordCount: 960,
        readTimeMinutes: 5,
        publishedDate: '1911',
        authorNote: 'Dickon brings his animals into the secret garden as Colin prepares to visit.',
        content: [
          'Spring had come over the Yorkshire moors like a green wave of enchantment. The yellow gorse was in bloom, smelling of honey and spice, and the larks rose high into the cloudless blue sky.',
          'In the secret garden, Mary and Dickon worked with trowel and spade. The rose vines were sprouting thousand upon thousand of ruby-tinted shoots. Delphiniums, columbines, and lilies were unfurling their leaves in the warm sun.',
          'Soot the crow sat on the garden wall cawing approval, while the robin brought twigs and moss to build a nest in the heart of an ancient box hedge.',
          '"The Magic is workin’," Dickon smiled, kneeling in the rich earth with his hands covered in sweet-smelling loam. "It’s workin’ in the soil, workin’ in the seeds, and it’s workin’ in Mary and Colin."',
          'Mary looked up at the sunlit ivy archway. Tomorrow they would wheel Colin through the garden door, into the sunlit air that would heal them all.'
        ]
      }
    ]
  },

  {
    id: 'anne-of-green-gables',
    slug: 'anne-of-green-gables',
    title: 'Anne of Green Gables',
    synopsis: 'When aging siblings Matthew and Marilla Cuthbert decide to adopt a boy to help on their Prince Edward Island farm, a mix-up brings Anne Shirley—a freckled, fiercely imaginative girl who transforms their quiet world with heart, humor, and poetic wonder.',
    author: 'L.M. Montgomery',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    coverAlt: 'A peaceful red-soil farm lane winding past white wooden farmhouses and blooming apple orchards under golden sunset.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Prince Edward Island', 'Cozy Country', 'Found Family', 'Heartwarming'],
    totalChapters: 12,
    rating: 5,
    readsCount: 5210,
    isPublicDomain: true,
    chapters: [
      {
        id: 'anne-ch1',
        chapterNumber: 1,
        title: 'Mrs. Rachel Lynde is Surprised',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'The idyllic beginning in Avonlea.',
        content: [
          'Mrs. Rachel Lynde lived just where the Avonlea main road dipped down into a little hollow, fringed with alders and ladies’ eardrops and traversed by a brook that had its source away back in the woods of the old Cuthbert place.',
          'Mrs. Rachel was sitting at her window on a bright June afternoon. The sun was warm and honey-colored, the orchard on the slope below the house was in a bridal flush of pinky-white blooms, hummed over by myriads of wild bees.',
          'And then, down the road rattled Matthew Cuthbert in his best buggy, wearing his white collar and best suit of clothes, driving his sorrel mare at an unaccustomed brisk trot. It was half past three on a weekday! What on earth was taking quiet Matthew Cuthbert away from his seed-drills on a fine planting afternoon?'
        ]
      },
      {
        id: 'anne-ch2',
        chapterNumber: 2,
        title: 'Matthew Cuthbert is Surprised',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'Matthew arrives at Bright River station and meets a girl instead of a boy.',
        content: [
          'Matthew Cuthbert had enjoyed the drive over the red sandstone roads of Prince Edward Island, though his shy bachelor heart quivered at the thought of meeting the orphan boy.',
          'When he reached Bright River station, the five-thirty train had come and gone. The platform was deserted except for a child sitting on a pile of shingles at the far end.',
          'It was a girl of about eleven, clad in a very short, very tight, very ugly dress of yellowish-gray wincey. She wore a faded brown sailor hat and beneath the hat, extending down her back, were two thick braids of vivid, unrepentant red hair.',
          'Her face was small, white, and thin, freckled across the bridge of her nose, with enormous eyes that looked green or gray depending on the light. When she saw Matthew, she picked up a dilapidated carpetbag and walked straight toward him with outstretched hand.'
        ]
      },
      {
        id: 'anne-ch3',
        chapterNumber: 3,
        title: 'Marilla Cuthbert is Surprised',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'Anne arrives at Green Gables and Marilla learns of the adoption blunder.',
        content: [
          'The sun was setting behind the apple orchard as the buggy turned into the lane of Green Gables. Marilla Cuthbert came to the kitchen door, wiping her flour-dusted hands on her apron.',
          'She stepped out into the twilight, looking for the sturdy boy who was supposed to help haul firewood and milk cows. Instead, out jumped a skinny girl in a yellow wincey dress, holding a battered carpetbag.',
          '"Matthew Cuthbert, who’s that?" Marilla demanded, adjusting her spectacles. "Where is the boy?"',
          '"There wasn’t any boy," said Matthew sheepishly. "There was only her at the station, and I couldn’t leave her there all night."',
          'The child dropped her bag, clasped her hands together, and cried out in agony: "You don’t want me! You don’t want me because I’m not a boy! Oh, I might have known it was all too beautiful to last!"'
        ]
      },
      {
        id: 'anne-ch4',
        chapterNumber: 4,
        title: 'Morning at Green Gables',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'Anne wakes to the white blossom of the snow-queen cherry tree.',
        content: [
          'It was broad daylight when Anne awoke and sat up in bed, staring confusedly at the window through which a flood of cheery sunshine was pouring.',
          'Outside, a huge cherry tree in full white blossom touched the sill, shedding fragrant petals across the floor. Below, a clover brook wound through the emerald valley and wild roses nodded along the pasture fence.',
          '"Dear old world," she murmured, leaning out the window and drinking in the crisp island air, "you are very lovely, and I am glad to be alive in you!"',
          'Marilla entered with a pitcher of water. "Get dressed, child. Today I must drive to White Sands and find out from Mrs. Spencer how this dreadful mistake occurred."'
        ]
      },
      {
        id: 'anne-ch5',
        chapterNumber: 5,
        title: 'Anne’s History',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'During the buggy ride, Anne tells Marilla of her childhood in Nova Scotia.',
        content: [
          'As the sorrel mare trotted down the shore road, Anne talked steadily, pouring out the story of her life with heartbreaking honesty.',
          'She was born in Bolingbroke, Nova Scotia. Her father and mother were both schoolteachers who died of fever when she was three months old. She had lived with Mrs. Thomas, who had four babies and an intemperate husband, and then with Mrs. Hammond, who had eight children—including three sets of twins!',
          '"I used to nurse twins and wash dishes all day long," Anne explained earnestly. "When I had no one to talk to, I talked to my reflection in the bookcase glass and named her Katie Maurice."',
          'Marilla looked down at the child’s small hands and freckled face, feeling an unexpected pang of pity tighten around her stern heart.'
        ]
      },
      {
        id: 'anne-ch6',
        chapterNumber: 6,
        title: 'Marilla Makes Up Her Mind',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'Facing the terrible alternative of Mrs. Blewett, Marilla decides to keep Anne.',
        content: [
          'At Mrs. Spencer’s house in White Sands, Mrs. Blewett—a sharp-faced, shrewish woman with seven disorderly children—offered to take Anne on the spot as an unpaid nursemaid.',
          'Marilla took one look at Mrs. Blewett’s hard gray eyes and cold mouth, then looked at Anne’s trembling shoulders and terrified pale face.',
          '"Well, I haven’t said we’ve decided not to keep her," Marilla said crisply, rising to her feet. "Matthew is set on keeping her, and I think we can manage to bring her up decently."',
          'On the drive home, Anne wept tears of uncontainable joy against Matthew’s old gray sleeve. Green Gables was her home at last.'
        ]
      },
      {
        id: 'anne-ch7',
        chapterNumber: 7,
        title: 'Anne Says Her Prayers',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'Marilla teaches Anne to pray in the gable room.',
        content: [
          'When Anne went to bed that night, Marilla followed her up to hear her say her prayers.',
          '"I’ve never said a prayer in my life," Anne admitted frankly. "Mrs. Thomas said God made my hair red on purpose, so I never cared to pray to Him."',
          'Marilla was shocked. "You must kneel down and ask God to forgive your sins and bless you."',
          'Anne knelt and clasped her hands, looking up at the stars beyond the cherry boughs. "Gracious Heavenly Father," she began poetically, "I thank Thee for the White Way of Delight and the Snow Queen and Green Gables. Please let me stay here forever, and make me pretty when I grow up. Yours respectfully, Anne Shirley."'
        ]
      },
      {
        id: 'anne-ch8',
        chapterNumber: 8,
        title: 'Anne’s Bringing-up Is Begun',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'Marilla sews three sensible, plain dresses with un-puffed sleeves.',
        content: [
          'Marilla believed in practical Christian upbringing. She bought heavy dark gingham and brown winsey, sewing three neat, plain dresses without a ruffle, bow, or puff.',
          'Anne examined the dresses with deep disappointment. "Oh, Marilla, couldn’t just one of them have puffed sleeves? Big, fashionable puffed sleeves filled with air?"',
          '"Puffed sleeves are ridiculous and worldly," Marilla replied firmly. "These dresses are durable, warm, and tidy, and that is quite enough for any sensible girl."',
          'Anne sighed deeply and went to the window. "I shall just have to imagine the puffed sleeves," she decided cheerfully. "In my imagination, they are three feet wide and lined with lilac silk!"'
        ]
      },
      {
        id: 'anne-ch9',
        chapterNumber: 9,
        title: 'Mrs. Rachel Lynde Is Properly Horrified',
        wordCount: 890,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'The famous explosive argument between Anne and Mrs. Rachel Lynde.',
        content: [
          'Mrs. Rachel Lynde came over to Green Gables to inspect the orphan girl. She looked Anne up and down through her gold spectacles and sniffed.',
          '"Well, Marilla, she’s terribly skinny and homely," Mrs. Rachel declared loud enough for all the valley to hear. "And her hair is as red as carrots! A real scarecrow, if you ask me."',
          'Anne’s temper flared like a blast furnace. Her eyes flashed fire, her small fists clenched, and she stamped her foot on the braided rug.',
          '"I hate you!" she cried passionately, her voice shaking. "How dare you say I’m skinny and ugly? How dare you say my hair is red as carrots? You are a rude, unfeeling, fat woman, and I’ll never forgive you as long as I live!"'
        ]
      },
      {
        id: 'anne-ch10',
        chapterNumber: 10,
        title: 'An Apology and an Afternoon Tea',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'Anne turns an apology into a theatrical masterpiece.',
        content: [
          'Marilla banished Anne to the east gable until she was ready to apologize to Mrs. Rachel. Matthew, however, crept up the back stairs in his stocking feet to whisper through the keyhole: "Don’t you be too hard on yourself, Anne. Mrs. Rachel is an awful meddlesome woman."',
          'The next afternoon, Anne walked over to Lynde’s Hollow with Marilla. She knelt before Mrs. Rachel with clasped hands and downcast eyes.',
          '"Oh, Mrs. Rachel, I have been so dreadfully wicked," Anne proclaimed with dramatic relish. "I have broken the law of hospitality and wounded your feelings. Can you ever find it in your Christian heart to forgive a poor orphan girl whose hair is as red as carrots?"',
          'Mrs. Rachel melted completely, gave Anne a slice of plum cake, and pronounced her "an odd little creature with a good heart."'
        ]
      },
      {
        id: 'anne-ch11',
        chapterNumber: 11,
        title: 'Anne’s Impressions of Sunday School',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1908',
        authorNote: 'Anne decorates her sailor hat with buttercups and wild roses.',
        content: [
          'On her first Sunday in Avonlea, Anne walked alone to Sunday School along the sun-drenched road through the woods.',
          'Along the way, the ditches were filled with golden buttercups, wild pink roses, and fragrant fern fronds. Unable to resist, Anne wove a glorious garland of blooms and pinned it all around the crown of her plain brown sailor hat.',
          'When she walked into the Avonlea church vestibule, the congregation stared in speechless astonishment at the little girl crowned like a woodland dryad.',
          'Marilla was mortified, but when Anne explained that the flowers were praising God in the sunshine, Marilla could only shake her head with a hidden smile.'
        ]
      },
      {
        id: 'anne-ch12',
        chapterNumber: 12,
        title: 'A Solemn Vow and Promise',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1908',
        authorNote: 'Anne meets Diana Barry and swears eternal friendship by the garden pool.',
        content: [
          'The day Diana Barry returned from her visit to town was a momentous one in Avonlea history.',
          'Marilla took Anne across the orchard to Orchard Slope. Diana was a pretty girl of Anne’s age, with rosy cheeks, sparkling black eyes, and glossy raven pigtails.',
          'Within ten minutes, the two girls had slipped away into the spruce woods to the edge of the woodland spring.',
          '"Will you swear to be my bosom friend—my kindred spirit—for ever and ever?" Anne asked solemnly, clasping Diana’s hands over the babbling clear water.',
          '"Why, Anne, isn’t swearing wicked?" Diana whispered, thrilled.',
          '"Not this kind of swearing," Anne assured her. "It’s just a sacred promise between two hearts that can never, ever be broken."'
        ]
      }
    ]
  },

  {
    id: 'pride-and-prejudice',
    slug: 'pride-and-prejudice',
    title: 'Pride and Prejudice',
    synopsis: 'Jane Austen’s timeless masterpiece of sparkling wit, social comedy, and romance. Elizabeth Bennet navigates the eccentricities of her family, the charms of Mr. Wickham, and the haughty pride of the brooding Mr. Darcy.',
    author: 'Jane Austen',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
    coverAlt: 'An open antique book resting beside delicate porcelain teacups and fresh garden roses.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Regency', 'Romance', 'Wit', 'Social Comedy', 'Classic Literature'],
    totalChapters: 12,
    rating: 5,
    readsCount: 6890,
    isPublicDomain: true,
    chapters: [
      {
        id: 'pp-ch1',
        chapterNumber: 1,
        title: 'It is a Truth Universally Acknowledged',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1813',
        authorNote: 'The iconic opening conversation between Mr. and Mrs. Bennet regarding Netherfield Park.',
        content: [
          'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
          'However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.',
          '"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"',
          'Mr. Bennet replied that he had not.',
          '"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it. A young man of large fortune from the north of England has taken it; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it, that he is to take possession before Michaelmas!"'
        ]
      },
      {
        id: 'pp-ch2',
        chapterNumber: 2,
        title: 'Mr. Bennet’s Secret Call',
        wordCount: 810,
        readTimeMinutes: 4,
        publishedDate: '1813',
        authorNote: 'Mr. Bennet secretly visits the new tenant of Netherfield Park.',
        content: [
          'Mr. Bennet was among the earliest of those who waited on Mr. Bingley. He had always intended to visit him, though to the last always assuring his wife that he should not go.',
          'When he returned home, he found his daughters trimming hats in the parlor while Mrs. Bennet lamented the lack of acquaintances.',
          '"I hope Mr. Bingley will like your hat, Lizzy," remarked Mr. Bennet casually.',
          '"We are not likely to know what Mr. Bingley likes," said his mother resentfully, "since we are not to visit him."',
          '"You forget, mama," said Elizabeth, "that we shall meet him at the assemblies, and that Mrs. Long has promised to introduce him."',
          '"I do not believe Mrs. Long will do any such thing. She is a selfish, hypocritical woman, and I have no opinion of her."',
          '"No more have I," said Mr. Bennet; "and I am glad to find that you do not depend on her serving you, for I have already called on Mr. Bingley myself."'
        ]
      },
      {
        id: 'pp-ch3',
        chapterNumber: 3,
        title: 'The Assembly at Meryton',
        wordCount: 920,
        readTimeMinutes: 5,
        publishedDate: '1813',
        authorNote: 'Mr. Darcy insults Elizabeth at the public assembly ball.',
        content: [
          'The assembly at Meryton was crowded and lively. Mr. Bingley had soon made himself acquainted with all the principal people in the room; he was lively and unreserved, danced every dance, and talked of giving a ball himself at Netherfield.',
          'His friend Mr. Darcy, however, soon drew the attention of the room by his fine, tall person, handsome features, and noble mien—and the report which was in general circulation within five minutes of his entrance, of his having ten thousand a year.',
          'The gentlemen pronounced him to be a fine figure of a man, the ladies declared he was much handsomer than Mr. Bingley, and he was looked at with great admiration for about half the evening, till his manners gave a disgust which turned the tide of his popularity.',
          'For he was discovered to be proud, to be above his company, and above being pleased; and not all his large estate in Derbyshire could then save him from having a most forbidding, disagreeable countenance.',
          'When Bingley urged him to dance with Elizabeth Bennet, Darcy looked at her coldly. "She is tolerable; but not handsome enough to tempt me; and I am in no humour at present to give consequence to young ladies who are slighted by other men."'
        ]
      },
      {
        id: 'pp-ch4',
        chapterNumber: 4,
        title: 'Jane and Elizabeth Confide',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1813',
        authorNote: 'The sisters discuss the contrasting characters of Bingley and Darcy.',
        content: [
          'When Jane and Elizabeth were alone, the former, who had been cautious in her praise before, expressed to her sister how very much she admired Mr. Bingley.',
          '"He is just what a young man ought to be," said she, "sensible, good-humoured, lively; and I never saw such happy manners!—so much ease, with such perfect good breeding!"',
          '"He is also handsome," replied Elizabeth, "which a young man ought likewise to be, if he possibly can. His character is thereby complete."',
          '"I was very much flattered by his asking me to dance a second time. I did not expect such a compliment."',
          '"Did not you? I did for you. But that is one great difference between us. Compliments always take you by surprise, and me never. What could be more natural than his asking you again? He could not help seeing that you were about five times as pretty as every other woman in the room."'
        ]
      },
      {
        id: 'pp-ch5',
        chapterNumber: 5,
        title: 'An Evening at Lucas Lodge',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1813',
        authorNote: 'The neighborhood discusses Darcy’s overbearing pride.',
        content: [
          'Within a short walk of Longbourn lived a family with whom the Bennets were particularly intimate. Sir William Lucas had been formerly in trade in Meryton, where he had made a tolerable fortune and risen to the honour of knighthood.',
          'Charlotte Lucas was a sensible, intelligent young woman, about twenty-seven, who was Elizabeth’s intimate friend.',
          '"If I were as rich as Mr. Darcy," cried a young Lucas, "I would keep a pack of foxhounds, and drink a bottle of wine every day."',
          '"Then you would drink a great deal more than you ought," said Mrs. Bennet; "and if I were to see you at it, I should take away your bottle directly."',
          'Charlotte spoke quietly to Elizabeth: "His pride does not offend me so much as pride often does, because there is an excuse for it. One cannot wonder that so very fine a young man, with family, fortune, everything in his favour, should think highly of himself. If I may so express it, he has a right to be proud."',
          '"That is very true," replied Elizabeth, "and I could easily forgive his pride, if he had not mortified mine."'
        ]
      },
      {
        id: 'pp-ch6',
        chapterNumber: 6,
        title: 'Charlotte Lucas’s Theory of Marriage',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1813',
        authorNote: 'Elizabeth begins to catch the attention of Mr. Darcy despite herself.',
        content: [
          'Occupied in observing Mr. Bingley’s attentions to her sister, Elizabeth was far from suspecting that she was herself becoming an object of some interest in the eyes of his friend.',
          'Mr. Darcy had at first scarcely allowed her to be pretty; he had looked at her without admiration at the ball; and when they next met, he looked at her only to criticise.',
          'But no sooner had he made it clear to himself and his friends that she hardly had a good feature in her face, than he began to find it was rendered uncommonly intelligent by the beautiful expression of her dark eyes.',
          'To this discovery succeeded some others equally mortifying. Though he had detected with a critical eye more than one failure of perfect symmetry in her form, he was forced to acknowledge her figure to be light and pleasing; and in spite of his asserting that her manners were not those of the fashionable world, he was caught by their easy playfulness.'
        ]
      },
      {
        id: 'pp-ch7',
        chapterNumber: 7,
        title: 'Jane at Netherfield in the Rain',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1813',
        authorNote: 'Mrs. Bennet’s scheme sends Jane to Netherfield on horseback in a storm.',
        content: [
          'Mr. Bennet’s property consisted almost entirely in an estate of two thousand a year, which, unfortunately for his daughters, was entailed, in default of heirs male, on a distant relation.',
          'One morning, an invitation arrived from Caroline Bingley asking Jane to dine at Netherfield.',
          '"Can I have the carriage, mama?" Jane asked.',
          '"No, my dear, you had better go on horseback, because it seems likely to rain; and then you must stay all night."',
          'The scheme succeeded beyond Mrs. Bennet’s wildest dreams. Jane was caught in a pelting deluge of autumn rain, arrived soaked through, and by morning had developed a violent cold and fever that confined her to bed at Netherfield.'
        ]
      },
      {
        id: 'pp-ch8',
        chapterNumber: 8,
        title: 'Elizabeth Walks to Netherfield',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1813',
        authorNote: 'Elizabeth walks three miles across muddy fields to nurse her sister.',
        content: [
          'Elizabeth, feeling real anxiety for her sister, determined to go to her, though the carriage was not to be had, and she was no horsewoman.',
          'Walking three miles across fields in the autumn mud was declared by her mother to be utter madness, but Elizabeth was resolute.',
          'She crossed field after field at a quick pace, jumping over stiles and springing over puddles with impatient activity, and found herself at last within view of the house, with weary ankles, dirty stockings, and a face glowing with the warmth of exercise.',
          'She was shown into the breakfast-parlour where the whole party was assembled. Her appearance created a great deal of surprise. That she should have walked three miles so early in the day, in such dirty weather, and by herself, was to Miss Bingley almost incredible.',
          'Mr. Darcy, however, said very little, but his eyes were fixed on the brilliance which the exercise had given to her complexion.'
        ]
      },
      {
        id: 'pp-ch9',
        chapterNumber: 9,
        title: 'A Morning in the Sickroom',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1813',
        authorNote: 'Elizabeth stays by Jane’s side while the Bingley sisters gossip below.',
        content: [
          'Elizabeth passed the chief of the morning with her sister, nursing her with gentle devotion. At half past six she was summoned to dinner.',
          'To the civil inquiries which then poured in from the ladies she gave a grateful answer, and reported that Jane was not better.',
          'Miss Bingley and Mrs. Hurst were very compassionate in their expressions, but as soon as Elizabeth left the dining-parlour, Caroline began to sneer at her sisterly devotion.',
          '"She has nothing, in short, to recommend her, but being an excellent walker. I shall never forget her appearance this morning. She really looked almost wild."',
          '"She did indeed, Louisa," said Mrs. Hurst. "To walk three miles, or four miles, or whatever it is, above her ankles in dirt, and alone, quite alone! What could she mean by it? It seems to me to shew an abominable sort of conceited independence."',
          '"It showed an affection for her sister that is very pleasing," said Bingley warmly.'
        ]
      },
      {
        id: 'pp-ch10',
        chapterNumber: 10,
        title: 'Conversations in the Drawing-Room',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1813',
        authorNote: 'A battle of wits between Elizabeth, Darcy, and Miss Bingley over letter writing.',
        content: [
          'The evening was spent in the drawing-room. Darcy was writing a letter to his sister Georgiana, while Miss Bingley was watching his progress and endeavouring to catch his attention by offering continual compliments upon his handwriting.',
          '"How delighted Miss Darcy will be to receive such a charming letter!" cried Caroline.',
          'Darcy made no answer.',
          '"You write uncommonly fast, Mr. Darcy."',
          '"You are mistaken. I write rather slowly."',
          '"How many letters you must have occasion to write in the course of a year! Letters of business, too! How odious I should think them!"',
          '"It is fortunate, then, that they fall to my lot instead of to yours."',
          'Elizabeth looked on with quiet amusement, catching Darcy’s eye as he dryly parried each flattery.'
        ]
      },
      {
        id: 'pp-ch11',
        chapterNumber: 11,
        title: 'Miss Bingley and Mr. Darcy',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1813',
        authorNote: 'Darcy defines the dangers of pride and resentment.',
        content: [
          'When the tea was over, Miss Bingley asked Elizabeth to walk around the room with her.',
          'Elizabeth was surprised, but agreed immediately. Mr. Darcy looked up from his book. He was as much awake to the novelty of attention in that quarter as Elizabeth herself.',
          '"Will you not join us, Mr. Darcy?" asked Miss Bingley.',
          '"You can have only two motives, Caroline, for walking about together, and with either I should interfere. You must either be in each other’s confidence, or you are conscious that your figures appear to the greatest advantage in walking."',
          'Elizabeth laughed. "He is meditating upon us, I am sure. Let us punish him by laughing at him."',
          '"Mr. Darcy is not to be laughed at," said Caroline coldly.',
          '"The wisest and the best of men," remarked Elizabeth, "may be rendered ridiculous by a person whose first object in life is a joke."',
          '"Certainly," said Darcy. "I have made it my study to avoid those weaknesses which expose a strong understanding to ridicule. Vanity is a weakness indeed. But pride—where there is a real superiority of mind, pride will be always under good regulation."'
        ]
      },
      {
        id: 'pp-ch12',
        chapterNumber: 12,
        title: 'Return to Longbourn',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1813',
        authorNote: 'Jane recovers and the sisters return home, while Darcy resolves to conceal his feelings.',
        content: [
          'On Sunday morning, Jane had recovered sufficiently to travel, and the Longbourn carriage was sent to Netherfield.',
          'The separation between Elizabeth and her hosts was accompanied by the utmost civility on all sides. Miss Bingley’s civility was very great, and she even made a polite farewell to Elizabeth, though her relief at seeing her depart was evident.',
          'Mr. Darcy was determined to be cautious. He felt Elizabeth’s power too strongly; he had been drawn to her sparkling eyes, her quick wit, and her independent spirit far more than was safe for a man of his station.',
          'He scarcely spoke ten words to her on that last morning, and scarcely looked at her once.',
          'Yet when the carriage rolled down the gravel sweep, Darcy stood by the library window, his heart troubled by feelings he had never known before.'
        ]
      }
    ]
  },

  {
    id: 'jane-eyre',
    slug: 'jane-eyre',
    title: 'Jane Eyre',
    synopsis: 'Charlotte Brontë’s stirring masterpiece of resilience and passion. An orphaned girl overcomes a cruel childhood and harsh boarding school to become a governess at Thornfield Hall, where a dark secret haunts the brooding Mr. Rochester.',
    author: 'Charlotte Brontë',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    coverAlt: 'A solitary lantern casting a warm golden glow across an ancient stone hallway in a Gothic English estate.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Gothic', 'Resilience', 'Victorian', 'Romance', 'Classic Literature'],
    totalChapters: 12,
    rating: 5,
    readsCount: 4610,
    isPublicDomain: true,
    chapters: [
      {
        id: 'je-ch1',
        chapterNumber: 1,
        title: 'The Window Seat at Gateshead Hall',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Jane curls up with Bewick’s History of British Birds on a cold winter afternoon.',
        content: [
          'There was no possibility of taking a walk that day. We had been wandering, indeed, in the leafless shrubbery an hour in the morning; but since dinner the cold winter wind had brought with it clouds so somber, and a rain so penetrating, that further outdoor exercise was now out of the question.',
          'I was glad of it: I never liked long walks, especially on chilly afternoons: dreadful to me was the coming home in the raw twilight, with nipped fingers and toes, and a heart saddened by the chidings of Bessie, the nurse, and humbled by the consciousness of my physical inferiority to Eliza, John, and Georgiana Reed.',
          'I mounted into the window-seat, drew in my feet, and sat cross-legged like a Turk; and having drawn the red moreen curtain nearly close, I found myself shrined in double retirement.',
          'Folds of scarlet drapery shut in my view to the right hand; to the left were the clear panes of glass, protecting, but not separating me from the drear November day. At intervals, while turning over the leaves of Bewick’s History of British Birds, I looked out on that winter day and lost myself in solitary contemplation.'
        ]
      },
      {
        id: 'je-ch2',
        chapterNumber: 2,
        title: 'The Dread of the Red-Room',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Jane is punished and locked in the dreaded chamber where Mr. Reed died.',
        content: [
          'The red-room was a cold room, because it seldom had a fire; it was silent, because remote from the nursery and kitchen; solemn, because it was known to be so seldom entered.',
          'The bed supported on massive pillars of mahogany, hung with curtains of deep red damask, stood out like a tabernacle in the centre; the two large windows, with their blinds always drawn down, were half shrouded in festoons and falls of similar drapery.',
          'It was here that my uncle, Mr. Reed, had died nine years ago; and here he had lain in state; and since that day a certain atmosphere of sacred chill and isolation possessed the chamber.',
          'I sat on a low ottoman near the marble chimney-piece, trembling with cold and indignation. "Why was I always suffering, always browbeaten, always accused, for ever condemned?"'
        ]
      },
      {
        id: 'je-ch3',
        chapterNumber: 3,
        title: 'Waking to Mr. Lloyd',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'The kind apothecary visits Jane after her collapse.',
        content: [
          'The next thing I remember is waking with a feeling as if I had had a frightful nightmare, and seeing before me a terrible red glare, crossed with thick black bars.',
          'I was in my own bed in the nursery. Beside me sat Mr. Lloyd, an apothecary, whom Mrs. Reed called in for the servants, while she summoned a physician for her own children.',
          'He held my wrist with kind fingers. "Well, who am I?" he asked gently.',
          '"You are Mr. Lloyd," I whispered.',
          '"What made you ill, my child?"',
          '"I was locked up in the red-room, and there was a ghost."',
          'Mr. Lloyd smiled gravely and turned to Bessie. Later that afternoon, he suggested to Mrs. Reed that the child might thrive better if sent away to school.'
        ]
      },
      {
        id: 'je-ch4',
        chapterNumber: 4,
        title: 'The Departure for Lowood School',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Jane speaks her mind to Mrs. Reed before leaving Gateshead forever.',
        content: [
          'Before I left Gateshead, I stood before Mrs. Reed in the breakfast-room, my heart throbbing with fierce resolution.',
          '"I am not deceitful," I cried out, "if I were, I should say I loved you; but I declare I do not love you: I dislike you the worst of any body in the world except John Reed; and this book about the liar you gave me, I will tell the school what kind of a woman you are!"',
          'Mrs. Reed looked terrified. My soul began to expand, to exult, with the strangest sense of freedom, of triumph, I had ever felt.',
          'At five o’clock on a cold January morning, the coach rattled up to the Gateshead lodge. Bessie kissed my cheek with tears in her eyes, lifted my trunk into the boot, and the horses galloped away into the dark.'
        ]
      },
      {
        id: 'je-ch5',
        chapterNumber: 5,
        title: 'Winter Days at Lowood',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'The harsh, frozen conditions of the charity institution.',
        content: [
          'Lowood School was a charity institution for the orphans of clergy and gentlemen. It was housed in a large gray stone building surrounded by cold northern moors.',
          'The daily regime was severe. We awoke at dawn in the freezing dormitory, broke the ice in our wash-pitchers with our knuckles, and assembled for two hours of prayers before breakfast.',
          'Breakfast was usually burned porridge that smelled so foul we could scarcely swallow it. Miss Temple, the superintendent, was the only beacon of grace, occasionally ordering bread and cheese for the starving girls from her own pocket.',
          'Yet despite the frostbite on our hands and the hollow gnawing in our stomachs, I felt that I was learning, and that my mind was stirring from its Gateshead stupor.'
        ]
      },
      {
        id: 'je-ch6',
        chapterNumber: 6,
        title: 'Friendship with Helen Burns',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Jane meets the serene, stoic spirit of Helen Burns.',
        content: [
          'In the gravel playground during the bitter afternoon recess, I noticed a girl sitting alone on a stone step, reading a book called Rasselas.',
          'Her name was Helen Burns. Though constantly rebuked and flogged by the cruel teacher Miss Scatcherd for untidiness, Helen never wept or struck back.',
          '"Why do you not resist?" I asked indignantly. "If she struck me with that rod, I should break it under her very nose!"',
          'Helen smiled gently with eyes full of quiet light. "It is far better to endure patiently a smart which nobody feels but yourself, than to commit a hasty action whose evil consequences will extend to all connected with you. Love your enemies; bless them that curse you."'
        ]
      },
      {
        id: 'je-ch7',
        chapterNumber: 7,
        title: 'Mr. Brocklehurst’s Inspection',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1847',
        authorNote: 'The hypocritical treasurer humiliates Jane on the stool of infamy.',
        content: [
          'One afternoon, the tall, black-clad figure of Mr. Brocklehurst strode into the schoolroom like a walking monument of sanctimony.',
          'He examined our hair, declaring that natural curls were worldly lusts that must be shorn with shears to preserve humility.',
          'In my nervousness, I dropped my slate upon the stone floor. It shattered with a loud crack.',
          '"Let the child who broke her slate step forward," Brocklehurst thundered. He placed me upon a high stool in the middle of the room.',
          '"Teachers, pupils, behold this girl! She is not an angel, she is not even a good girl. She is a liar! Shun her, avoid her company, exclude her from your games!"',
          'I felt crushed into the dust of shame, until looking up through my tears, Helen Burns passed by my stool and gave me a smile that shone like the countenance of an angel.'
        ]
      },
      {
        id: 'je-ch8',
        chapterNumber: 8,
        title: 'Springtime and Sunshine in the Valley',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Spring revives Lowood, but bringing with it the seeds of tragedy.',
        content: [
          'April arrived with soft southern rains and warm breezes. Lowood valley, so grim and frozen in winter, was transformed into an Eden of green hills and bluebells.',
          'The garden beds burst into blossom—primroses, crocuses, and sweet-scented stocks. For an hour each afternoon, we were allowed to walk down by the running beck under the shade of blossoming willows.',
          'Yet the sweet scents of spring could not mask the heavy smell of fever that had begun to creep through the dormitory halls.',
          'Typhus had arrived in the valley, fed by damp rooms, bad drainage, and half-starved bodies.'
        ]
      },
      {
        id: 'je-ch9',
        chapterNumber: 9,
        title: 'The Farewell to Helen',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Jane creeps into Miss Temple’s room for a final night beside Helen Burns.',
        content: [
          'Helen did not have typhus; her illness was consumption. She lay in a little white bed in Miss Temple’s private chamber.',
          'One moonlight night, hearing that Helen was sinking fast, I stole barefoot down the quiet passage and slipped into her room.',
          '"Are you awake, Helen?" I whispered, climbing into the bed beside her.',
          '"Dear Jane," she whispered, her thin arms encircling my neck. "You are come to bid me good-bye. I am going to God."',
          '"Where is God, Helen?"',
          '"In Heaven, Jane, where we shall meet again in peace."',
          'I kissed her cold forehead and closed my eyes against her cheek. When I woke in the morning, the doctor had arrived, and Helen’s gentle spirit had flown.'
        ]
      },
      {
        id: 'je-ch10',
        chapterNumber: 10,
        title: 'Leaving Lowood for Thornfield',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Jane advertises as a private governess and receives a fateful reply.',
        content: [
          'Eight years passed at Lowood—six as a pupil, two as a teacher. When Miss Temple married and left, the school seemed to lose its guiding soul.',
          'I longed for liberty, for a new life among real people in the great world beyond the northern hills.',
          'I placed an advertisement in the Herald newspaper: "A young lady accustomed to tuition wishes to acquire a situation in a family, to undertake the education of children under twelve years of age."',
          'A week later, a reply arrived from Mrs. Fairfax of Thornfield Hall, near Millcote, offering thirty pounds a year to teach a little French girl.',
          'I packed my little trunk once more, eager for whatever destiny awaited me.'
        ]
      },
      {
        id: 'je-ch11',
        chapterNumber: 11,
        title: 'Arrival at Thornfield Hall',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1847',
        authorNote: 'Jane enters the grand, quiet manor and meets Mrs. Fairfax and Adèle.',
        content: [
          'A brougham conveyed me through the iron gates of Thornfield Park in the dark of autumn evening.',
          'The house was a noble three-story hall of gray battlements and stone mullioned windows, backed by a dark rookery of ancient beech trees.',
          'Mrs. Fairfax, the elderly housekeeper, received me with touching warmth in a cozy parlor where a bright fire blazed on the hearth.',
          'The next morning, I was introduced to my pupil, Adèle Varens, a lively, French-speaking girl who was the ward of the hall’s absent master, Mr. Edward Rochester.',
          'The hall was peaceful, yet a strange, brooding hush seemed to hang over its tapestry-hung galleries.'
        ]
      },
      {
        id: 'je-ch12',
        chapterNumber: 12,
        title: 'The Quiet Rooftop and the Gloaming',
        wordCount: 920,
        readTimeMinutes: 5,
        publishedDate: '1847',
        authorNote: 'Jane walks upon the roof and hears a chilling, preternatural laugh.',
        content: [
          'In the afternoons, when Adèle was practicing her music, I climbed up the narrow wooden stairs to the leads of the roof.',
          'From there, looking over the miles of autumnal woodland and distant hills, my heart yearned for a power of vision which might overpass that limit—which might reach the busy world of towns and regions full of life.',
          'It is in vain to say human beings ought to be satisfied with tranquility: they must have action; and they will make it if they cannot find it.',
          'One afternoon, as I walked down the third-story corridor where the old family portraits hung in gloom, a strange sound stopped me cold.',
          'It was a laugh—tragic, mirthless, and distinctly audible behind a bolted oak door. It echoed down the silent gallery and chilled the blood in my veins.'
        ]
      }
    ]
  },

  {
    id: 'little-women',
    slug: 'little-women',
    title: 'Little Women',
    synopsis: 'Louisa May Alcott’s cherished story of the March sisters—Meg, Jo, Beth, and Amy—growing up in Civil War-era New England. A heartwarming journey of sisterhood, creative ambition, sacrifice, and the search for independence.',
    author: 'Louisa May Alcott',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80',
    coverAlt: 'A stack of antique books tied with natural twine beside a cozy wool blanket and candle.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Sisterhood', 'Cozy Life', 'New England', 'Family', 'Classic Literature'],
    totalChapters: 12,
    rating: 5,
    readsCount: 5120,
    isPublicDomain: true,
    chapters: [
      {
        id: 'lw-ch1',
        chapterNumber: 1,
        title: 'Playing Pilgrims',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1868',
        authorNote: 'The March sisters sit by the hearth on Christmas Eve.',
        content: [
          '"Christmas won’t be Christmas without any presents," grumbled Jo, lying on the rug.',
          '"It’s so dreadful to be poor!" sighed Meg, looking down at her old dress.',
          '"I don’t think it’s fair for some girls to have plenty of pretty things, and other girls nothing at all," added little Amy, with an injured sniff.',
          '"We’ve got Father and Mother, and each other," said Beth contentedly from her corner.',
          'The four young faces on which the firelight shone brightened at the cheerful words, but darkened again as Jo said sadly, "We haven’t got Father, and shall not have him for a long time." She didn’t say "perhaps never," but each silently thought it, remembering that he was far away at the war front.'
        ]
      },
      {
        id: 'lw-ch2',
        chapterNumber: 2,
        title: 'A Merry Christmas',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1868',
        authorNote: 'The sisters give their Christmas breakfast to the starving Hummel family.',
        content: [
          'Jo was the first to wake in the gray dawn of Christmas morning. No stockings hung at the fireplace, but under each pillow was a little colored book—Pilgrim’s Progress—left by Marmee.',
          'When they went down to breakfast, the table was set with creamy milk, muffins, and sweet buckwheats.',
          'Before they could sit down, Marmee came in with cold cheeks and a radiant face. "Merry Christmas, little daughters! Not far away from here, Mrs. Hummel is lying sick with six children cold and hungry in one bed. Will you give them your Christmas breakfast as a present?"',
          'For a minute no one spoke. Then Jo exclaimed, "I’m so glad you came before we began!"',
          'In five minutes, the four girls were trudging through the snow carrying firewood, hot tea, porridge, and muffins to the wretched room, warming cold little hands and filling empty mouths with joy.'
        ]
      },
      {
        id: 'lw-ch3',
        chapterNumber: 3,
        title: 'The Laurence Boy',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1868',
        authorNote: 'Jo hides behind the curtain at the Gardiner party and meets Laurie.',
        content: [
          '"Jo! Jo! Where are you?" cried Meg at the New Year’s Eve dance.',
          'Jo had hidden herself behind the velvet curtains of an alcove because she had burned the back of her only silk dress and didn’t want anyone to see it.',
          'Parting the drapery, she discovered someone else was already hiding there—a tall, curly-haired boy with big handsome black eyes.',
          '"Dear me, I didn’t know anyone was here!" stammered Jo.',
          'The boy laughed pleasantly. "Don’t mind me. I’m Theodore Laurence—Laurie, my friends call me. I live next door in the big stone house with my grandfather."',
          'Within ten minutes, Jo and Laurie were laughing like old comrades, sharing cakes and making fun of the fashionable dancers.'
        ]
      },
      {
        id: 'lw-ch4',
        chapterNumber: 4,
        title: 'Burdens and Resolves',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1868',
        authorNote: 'The sisters take up their daily duties after the holidays.',
        content: [
          'The new year brought back the daily routine of work. Meg went out to teach the four unruly King children, Jo attended her eccentric Aunt March, Amy went to school, and Beth kept house with Hannah.',
          'In the evenings, they gathered around the warm parlor table with their mending and knitting, sharing the day’s triumphs and frustrations.',
          'Marmee listened with infinite patience, showing them how every trial was a burden on the Pilgrim’s Way to the Celestial City.',
          '"Cheer up, girls," said Jo, inking her fingers over an unfinished play. "Someday I’ll write a book and make a fortune, and we’ll all ride in velvet carriages!"'
        ]
      },
      {
        id: 'lw-ch5',
        chapterNumber: 5,
        title: 'Being Neighborly',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1868',
        authorNote: 'Jo visits the lonely Laurie in his magnificent, solitary mansion.',
        content: [
          'Looking out the parlor window at the grand stone house next door, Jo saw Laurie looking pale and solitary behind the high glass pane.',
          '"That boy needs company and fresh air," she declared, arming herself with a snow shovel, a dish of blancmange from Meg, and three kittens for cheer.',
          'She tossed a snowball against his window. Laurie opened it with a delighted shout.',
          'Moments later, Jo was ushering herself into Laurie’s magnificent library, lined from floor to ceiling with thousands of volumes in rich bindings.',
          'Old Mr. Laurence entered, leaning on his cane, but Jo’s frank, unaffected charm won the old gentleman’s heart in an instant.'
        ]
      },
      {
        id: 'lw-ch6',
        chapterNumber: 6,
        title: 'Beth Finds the Palace Beautiful',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1868',
        authorNote: 'Shy Beth is given free run of the Laurence grand piano.',
        content: [
          'Beth was as shy as a field mouse. She dreaded strangers, but she loved music with a passion that made her little heart ache.',
          'Old Mr. Laurence learned that Beth longed to play the magnificent grand piano in his silent music room.',
          'He sent a note: "Little Miss March may come over any morning between nine and ten, when no one is there, and play as long as she pleases."',
          'Beth crept over like a ghost, touched the keys, and wept with delight at the rich, glorious tones.',
          'In gratitude, she worked a pair of embroidered velvet slippers for the old gentleman, who in return sent a beautiful rosewood piano right into the March parlor.'
        ]
      },
      {
        id: 'lw-ch7',
        chapterNumber: 7,
        title: 'Amy’s Valley of Humiliation',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1868',
        authorNote: 'The pickled lime incident at Amy’s school.',
        content: [
          'In Amy’s school, the reigning fashion of the season was pickled limes. Girls traded them, sucked them, and were treated with contempt if they had no limes to bestow.',
          'Amy saved her pennies and bought twenty-four plump limes in a paper bag.',
          'Alas! A jealous classmate betrayed her to Mr. Davis, the schoolmaster, who ordered Amy to throw every lime out the window into the snow, and punished her with blows on the hand.',
          'Amy went home weeping with mortification. Marmee withdrew her from school, teaching her that vulgar vanity was a poor trade for true dignity.'
        ]
      },
      {
        id: 'lw-ch8',
        chapterNumber: 8,
        title: 'Jo Meets Apollyon',
        wordCount: 920,
        readTimeMinutes: 5,
        publishedDate: '1868',
        authorNote: 'Amy burns Jo’s manuscript, leading to a near-fatal accident on the ice.',
        content: [
          'When Jo and Laurie refused to let Amy accompany them to the theater, Amy’s spiteful temper got the better of her.',
          'She took Jo’s precious manuscript—the work of two years—and threw it into the parlor fire.',
          'When Jo discovered the charred ashes, she flew into a terrible rage, declaring she would never forgive Amy as long as she lived.',
          'The next day, while skating on the frozen river with Laurie, Jo saw Amy following them on thin ice. Blinded by lingering anger, Jo didn’t warn her in time.',
          'A sickening crack rang out, and Amy vanished under the black water! Laurie and Jo pulled her out shivering and half-drowned.',
          'That night, kneeling by Amy’s bed, Jo wept bitter tears of remorse, begging Marmee to help her conquer her fierce, destructive temper.'
        ]
      },
      {
        id: 'lw-ch9',
        chapterNumber: 9,
        title: 'Meg Goes to Vanity Fair',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1868',
        authorNote: 'Meg spends a fortnight with the wealthy Moffat family and learns about true worth.',
        content: [
          'Meg was invited to spend two weeks at the fashionable Moffat home in the city.',
          'Dazzled by silk dresses, jewels, and gossip, Meg allowed the Moffat girls to powder her face, lace her into a tight low-cut gown, and parade her around the ball like a doll.',
          'Laurie was present at the party and looked at her with frank disapproval. "I don’t like you like this, Meg. You don’t look like yourself; you look like a fashionable stranger."',
          'Meg felt ashamed. When she returned home, she laid her head in Marmee’s lap and confessed everything, learning that simple goodness outshines all the hollow glitter in the world.'
        ]
      },
      {
        id: 'lw-ch10',
        chapterNumber: 10,
        title: 'The P.C. and P.O.',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1868',
        authorNote: 'The Pickwick Club meetings and the secret post office in the garden hedge.',
        content: [
          'In the garret room, the four sisters met every Saturday evening as the Pickwick Club, wearing paper spectacles and reading their handwritten newspaper, The Pickwick Portfolio.',
          'Jo proposed electing Laurie as an honorary member, presenting him with the key to the secret post office box in the garden hedge between the two houses.',
          'Through the old hollow post box passed letters, poems, gingerbread, flowers, and cheerful secrets, binding the five young hearts in golden bonds of youth.'
        ]
      },
      {
        id: 'lw-ch11',
        chapterNumber: 11,
        title: 'Experiments in Idleness',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1868',
        authorNote: 'The girls try a week of complete loafing with disastrous results.',
        content: [
          'During the summer vacation, the sisters begged Marmee to let them have a week of utter idleness—no work, no lessons, no chores.',
          'Marmee consented with a wise smile.',
          'By Wednesday, Meg was bored to tears, Jo had a headache from reading novels all day, Amy’s drawings were smudged, and the canary starved because no one remembered to feed it.',
          'On Saturday, Marmee took a day off herself, leaving the girls to cook dinner. Jo scorched the soup, undercooked the asparagus, and served salt-crusted strawberries!',
          'They laughed until they cried, unanimously agreeing that honest work was the truest secret to human happiness.'
        ]
      },
      {
        id: 'lw-ch12',
        chapterNumber: 12,
        title: 'Camp Laurence',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1868',
        authorNote: 'A glorious summer picnic on Longmeadow Island.',
        content: [
          'Beth was very quiet, but she loved a picnic, so Laurie organized a grand expedition to Longmeadow Island on the river.',
          'Two boats carried the girls, Laurie, Mr. Brooke (Laurie’s tutor), and some English visitors down the willow-bordered stream.',
          'They pitched a white tent under the spreading maples, ate cold chicken and gingerbread, played croquet, and told stories until the golden sun slanted through the trees.',
          'Looking around at the laughing circle of kindred hearts, Jo thought that youth and friendship were the richest treasures under heaven.'
        ]
      }
    ]
  },

  {
    id: 'walden',
    slug: 'walden',
    title: 'Walden: Life in the Woods',
    synopsis: 'Henry David Thoreau’s profound, meditative account of living simply in a small self-built cabin by Walden Pond. A masterwork of natural philosophy, intentionality, quiet rebellion, and deep mindful observation.',
    author: 'Henry David Thoreau',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    coverAlt: 'A quiet pine forest with morning mist rising above a crystal clear wilderness pond.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Philosophy', 'Nature', 'Mindfulness', 'Solitude', 'Simplicity'],
    totalChapters: 12,
    rating: 5,
    readsCount: 3980,
    isPublicDomain: true,
    chapters: [
      {
        id: 'w-ch1',
        chapterNumber: 1,
        title: 'Economy',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1854',
        authorNote: 'Thoreau examines the unnecessary burdens and consumerist traps of civilized life.',
        content: [
          'When I wrote the following pages, or rather the bulk of them, I lived alone, in the woods, a mile from any neighbor, in a house which I had built myself, on the shore of Walden Pond, in Concord, Massachusetts, and earned my living by the labor of my hands only. I lived there two years and two months.',
          'The mass of men lead lives of quiet desperation. What is called resignation is confirmed desperation. From the desperate city you go into the desperate country, and have to console yourself with the bravery of minks and muskrats.',
          'Most of the luxuries, and many of the so-called comforts of life, are not only not indispensable, but positive hindrances to the elevation of mankind.',
          'With respect to luxuries and comforts, the wisest have ever lived a more simple and meagre life than the poor.'
        ]
      },
      {
        id: 'w-ch2',
        chapterNumber: 2,
        title: 'Where I Lived, and What I Lived For',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1854',
        authorNote: 'The famous declaration of living deliberately.',
        content: [
          'I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived.',
          'I did not wish to live what was not life, living is so dear; nor did I wish to practise resignation, unless it was quite necessary. I wanted to live deep and suck out all the marrow of life.',
          'Simplicity, simplicity, simplicity! I say, let your affairs be as two or three, and not a hundred or a thousand; instead of a million count half a dozen, and keep your accounts on your thumb-nail.',
          'In the midst of this chopping sea of civilized life, such are the clouds and storms and quicksands and thousand-and-one items to be allowed for, that a man has to live, if he would not founder and go to the bottom and not make his port at all, by dead reckoning.'
        ]
      },
      {
        id: 'w-ch3',
        chapterNumber: 3,
        title: 'Reading',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1854',
        authorNote: 'On the noble art of reading true books in a true spirit.',
        content: [
          'With a little more deliberation in the choice of their pursuits, all men would perhaps become essentially students and observers.',
          'Books are the treasured wealth of the world and the fit inheritance of generations and nations. Their authors are a natural and irresistible aristocracy in every society, and, more than kings or emperors, exert an influence on mankind.',
          'To read well, that is, to read true books in a true spirit, is a noble exercise, and one that will task the reader more than any exercise which the customs of the day esteem.',
          'It requires a training such as the athletes underwent, the steady intention almost of the whole life to this object.'
        ]
      },
      {
        id: 'w-ch4',
        chapterNumber: 4,
        title: 'Sounds',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1854',
        authorNote: 'Listening to the whistle of the locomotive, the owls, and the wind in the pines.',
        content: [
          'As I sit at my window this summer afternoon, hawks are circling about my clearing; the tantivy of wild pigeons is heard in the woods; and the whip-poor-will sings her vespers.',
          'The whistle of the locomotive penetrates my woods summer and winter, sounding like the scream of a hawk sailing over some farmer’s yard.',
          'When other birds are still, the screech owls take up the strain, mournful responses of low northern dirges. Their dismal scream is truly Ben Jonsonian. Wise midnight hags! It is no honest and blunt tu-whit tu-who of the poets, but the solemn graveside lamentation of a mind despairing of human life.'
        ]
      },
      {
        id: 'w-ch5',
        chapterNumber: 5,
        title: 'Solitude',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1854',
        authorNote: 'Finding companionable peace in nature without loneliness.',
        content: [
          'This is a delicious evening, when the whole body is one sense, and imbibes delight through every pore. I go and come with a strange liberty in Nature, a part of herself.',
          'I have never felt lonesome, or in the least oppressed by a sense of solitude, but once, and that was a few weeks after I came to the woods, when, for an hour, I doubted if the near neighborhood of man was not essential to a serene and healthy life.',
          'In the midst of a gentle rain, I was suddenly sensible of such sweet and beneficent society in Nature, in the very pattering of the drops, and in every sound and sight around my house, an infinite and unaccountable friendliness all at once like an atmosphere sustaining me, that made the fancied advantages of human neighborhood insignificant.'
        ]
      },
      {
        id: 'w-ch6',
        chapterNumber: 6,
        title: 'Visitors',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1854',
        authorNote: 'Three chairs in the cabin: one for solitude, two for friendship, three for society.',
        content: [
          'I think that I love society as much as most, and am ready enough to fasten myself like a bloodsucker for the time to any full-blooded man that comes in my way.',
          'I had three chairs in my house; one for solitude, two for friendship, three for society. When visitors came in larger and unexpected numbers, there was but the third chair for them all, but they generally economized the room by standing up.',
          'My best room, however, my withdrawing room, always ready for company, on whose carpet the sun rarely fell, was the pine wood behind my house.',
          'Thither in summer days, when distinguished guests came, I took them, and a priceless domestic swept the floor and dusted the furniture and kept the things in order.'
        ]
      },
      {
        id: 'w-ch7',
        chapterNumber: 7,
        title: 'The Bean-Field',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1854',
        authorNote: 'Cultivating two acres of beans with a hoe and meditating on labor.',
        content: [
          'Meanwhile my beans, the length of whose rows, added together, was seven miles already, were impatient to be hoed, for the earliest had grown considerably before the latest were in the ground.',
          'It was a rare amusement, which, continued too long, might have become a dissipation. Though I gave them no manure, and didn’t hoe them till after nine in the morning, they throve remarkably.',
          'When my hoe jingled against the stones, that music echoed out to the woods and the sky, and was an accompaniment to my labor which yielded an instant and immeasurable crop.',
          'I was determined to know beans.'
        ]
      },
      {
        id: 'w-ch8',
        chapterNumber: 8,
        title: 'The Village',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1854',
        authorNote: 'Walking into Concord village to observe the busy gossip and newspapers.',
        content: [
          'After hoeing, or perhaps reading and writing, in the forenoon, I usually bathed again in the pond, swimming across one of its coves for a stint, and washed the dust of labor from my person.',
          'Every day or two I strolled to the village to hear some of the gossip which is incessantly going on there, circulating either by word of mouth, or from newspaper to newspaper.',
          'The village appeared to me a great news room; and on one side, to support it, as once at Redding & Company’s on State Street, they kept nuts and raisins, or salt and meal and other provisions.',
          'As I walked back through the dark woods at midnight, I found my path by the feel of the earth under my feet, rejoicing to escape the din of gossiping tongues.'
        ]
      },
      {
        id: 'w-ch9',
        chapterNumber: 9,
        title: 'The Ponds',
        wordCount: 920,
        readTimeMinutes: 5,
        publishedDate: '1854',
        authorNote: 'The transcendent beauty and crystal purity of Walden water.',
        content: [
          'The scenery of Walden is on a humble scale, and, though very beautiful, does not approach to grandeur, nor can it much concern one who has not frequented it long or lived by its shore.',
          'Yet this pond is so remarkable for its depth and purity as to merit a particular description. It is a clear and deep green well, half a mile long and a mile and three quarters in circumference, and contains about sixty-one and a half acres.',
          'A lake is the landscape’s most beautiful and expressive feature. It is earth’s eye; looking into which the beholder measures the depth of his own nature.',
          'The fluviatile trees next the shore are the slender eyelashes which fringe it, and the wooded hills and cliffs around are its overhanging brows.'
        ]
      },
      {
        id: 'w-ch10',
        chapterNumber: 10,
        title: 'Baker Farm',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1854',
        authorNote: 'Sheltering from a thunderstorm and discussing life with John Field.',
        content: [
          'Sometimes I rambled to pine groves, large or small, where the needles make a soft carpet for the feet and the wind soughs in the boughs.',
          'One afternoon, overtaken by a sudden thunder-shower, I took shelter in the dilapidated shanty of John Field, an honest, hard-working Irishman who worked day and night bogging meadows for ten dollars an acre.',
          'I tried to help him with my experience: told him that he worked hard merely to pay for tea, coffee, butter, milk, and beef, and that if he would live more simply on water and corn meal, he might work but one day in six.',
          'Alas! John Field looked at me as if I spoke of an impossible paradise, bound fast to his heavy boots and hopeless toil.'
        ]
      },
      {
        id: 'w-ch11',
        chapterNumber: 11,
        title: 'Higher Laws',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1854',
        authorNote: 'The dual nature of humanity: the wild instinct and the spiritual aspiration.',
        content: [
          'As I came home through the woods with my string of fish, trailing my pole, it being now quite dark, I caught a glimpse of a woodchuck stealing across my path, and felt a strange thrill of savage delight, and was strongly tempted to seize and devour him raw.',
          'I found in myself, and still find, an instinct toward a higher, or, as it is named, spiritual life, as do most men, and another toward a primitive rank and savage one, and I reverence them both.',
          'I love the wild not less than the good.',
          'The fisherman, hunter, woodchopper, and others, spending their lives in the fields and woods, in a peculiar sense a part of Nature themselves, are often in a more favorable mood for observing her, in the intervals of their pursuits, than philosophers or poets.'
        ]
      },
      {
        id: 'w-ch12',
        chapterNumber: 12,
        title: 'Brute Neighbors & The Spring Awakening',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1854',
        authorNote: 'The battle of the ants and the loon’s wild laugh upon the pond.',
        content: [
          'One day when I went out to my wood-pile, or rather my pile of stumps, I observed two large ants, the one red, the other much larger, nearly half an inch long, and black, fiercely contending with one another.',
          'They fought with more pertinacity than bulldogs. Neither manifested the least disposition to retreat. It was evident that it was a duel to the death.',
          'In October, the loons arrived on the pond. One would laugh his wild demoniac laugh, dive deep, and rise fifty rods away in an unexpected direction, mocking all my pursuit with his unearthly mirth.',
          'I left the woods for as good a reason as I went there. Perhaps it seemed to me that I had several more lives to live, and could not spare any more time for that one.',
          'If one advances confidently in the direction of his dreams, and endeavors to live the life which he has imagined, he will meet with a success unexpected in common hours.'
        ]
      }
    ]
  },

  {
    id: 'wuthering-heights',
    slug: 'wuthering-heights',
    title: 'Wuthering Heights',
    synopsis: 'Emily Brontë’s brooding, atmospheric tale of obsessive love, revenge, and wild heather moors. Heathcliff and Catherine Earnshaw’s stormy bond haunts the weathered stone walls of Wuthering Heights across generations.',
    author: 'Emily Brontë',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80',
    coverAlt: 'A stormy sky brooding over dark, windswept heather moorlands in northern England.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Gothic', 'Passion', 'Yorkshire', 'Classic Literature'],
    totalChapters: 10,
    rating: 5,
    readsCount: 4120,
    isPublicDomain: true,
    chapters: [
      {
        id: 'wh-ch1',
        chapterNumber: 1,
        title: '1801: A Visit to Wuthering Heights',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Mr. Lockwood visits his solitary, surly landlord Heathcliff.',
        content: [
          '1801.—I have just returned from a visit to my landlord—the solitary neighbour that I shall be troubled with. This is certainly a beautiful country! In all England, I do not believe that I could have fixed on a situation so completely removed from the stir of society.',
          '"Wuthering" being a significant provincial adjective, descriptive of the atmospheric tumult to which its station is exposed in stormy weather.',
          'Pure, bracing ventilation they must have up there at all times, indeed: one may guess the power of the north wind blowing over the edge, by the excessive slant of a few stunted firs at the end of the house.',
          'Mr. Heathcliff forms a singular contrast to his abode and style of living. He is a dark-skinned gypsy in aspect, in dress and manners a gentleman: that is, as much a gentleman as many a country squire.'
        ]
      },
      {
        id: 'wh-ch2',
        chapterNumber: 2,
        title: 'A Storm on the Moor',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Lockwood is snowed in and attacked by sheepdogs.',
        content: [
          'Yesterday afternoon set in cold and dark. I had half a mind to spend it by my study fire, instead of wading through heath and mud to Wuthering Heights.',
          'On that bleak hill-top the earth was hard with a black frost, and the air made me shiver through every bone.',
          'Inside, the younger Catherine sat like a cold stone by the hearth, refusing to speak or pour tea.',
          'When the snow began to whirl in blinding sheets across the dark moor, Heathcliff coldly refused to provide a guide to Thrushcross Grange. "A guide? The horses are in the stable, and I have no lads to waste on fools who wander in snowstorms."'
        ]
      },
      {
        id: 'wh-ch3',
        chapterNumber: 3,
        title: 'The Ghost of Catherine',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1847',
        authorNote: 'Lockwood sleeps in the oak-paneled bed and feels an icy hand at the window.',
        content: [
          'Zillah led me to a chamber containing a large oak closet with sliding panels. Inside was a couch and a little bookshelf.',
          'Scratched into the paint on the window ledge were three names repeated a thousand times: Catherine Earnshaw, Catherine Heathcliff, Catherine Linton.',
          'In the middle of the night, awakened by the tapping of a dry fir bough against the pane, I reached out my hand to stop the noise.',
          'My fingers closed on the ice-cold fingers of a little hand!',
          'The intense horror of nightmare came over me: I tried to draw back my arm, but the hand clung to it, and a voice sobbed piteously: "Let me in—let me in! I’m come home: I’d lost my way on the moor!"',
          'Heathcliff burst into the room, pushed me aside, and flung open the casement into the howling tempest: "Come in! Come in!" he sobbed, tears gushing from his fierce eyes. "Cathy, do come. Oh, my heart’s darling! Hear me this once, Catherine, at last!"'
        ]
      },
      {
        id: 'wh-ch4',
        chapterNumber: 4,
        title: 'Nelly Dean’s Narrative Begins',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Old Mr. Earnshaw brings a ragged orphan home from Liverpool.',
        content: [
          'Confined to my room at Thrushcross Grange by a violent cold, I begged the housekeeper, Mrs. Ellen Dean, to sit by my fire and tell me the history of the strange family at the Heights.',
          '"It’s a cuckoo’s history, sir," said Nelly, clicking her knitting needles. "Old Mr. Earnshaw went on foot to Liverpool sixty miles away, and when he returned three days later, he opened his greatcoat in the kitchen."',
          'Out tumbled a dirty, ragged, black-haired child, who looked as if it came from the devil himself, speaking some gibberish nobody could understand.',
          'They named him Heathcliff, after a son who had died in childhood, and while Hindley hated him from that first hour, little Cathy grew so fond of him that she would follow him anywhere over the moors.'
        ]
      },
      {
        id: 'wh-ch5',
        chapterNumber: 5,
        title: 'The Free Children of the Heather',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Heathcliff and Cathy run wild on the moors.',
        content: [
          'When old Earnshaw died, Hindley treated Heathcliff like a common farm labourer, driving him out of the parlour to work with the stable-hands.',
          'Yet Heathcliff bore Hindley’s degradation with stoic patience, because every afternoon he and Cathy escaped to the open moors.',
          'They ran barefoot through the heather from morning till dusk, without a thought for dinner or scoldings.',
          'One Sunday evening, they crept down the valley to Thrushcross Grange to spy on the pampered Linton children through the drawing-room window.'
        ]
      },
      {
        id: 'wh-ch6',
        chapterNumber: 6,
        title: 'Cathy at Thrushcross Grange',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Cathy is bitten by the bulldog Skulker and stays with the civilized Lintons.',
        content: [
          'The Lintons’ bulldog Skulker seized Cathy by the ankle as they tried to escape the terrace.',
          'Old Mr. Linton carried her into the carpeted parlour, washing her bleeding foot and treating her with the utmost gentility, while driving ragged Heathcliff from the door like a stray cur.',
          'Cathy stayed at Thrushcross Grange five weeks until Christmas. When she returned to Wuthering Heights, she was dressed in fine tartan velvet, with her hair curled in glossy ringlets.',
          'She laughed at Heathcliff’s dirty hands and black scowl. Heathcliff turned on his heel and rushed out into the driving rain, his proud heart wounded beyond healing.'
        ]
      },
      {
        id: 'wh-ch7',
        chapterNumber: 7,
        title: 'Cathy’s Fatal Choice',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Cathy confesses her heart to Nelly by the kitchen fire.',
        content: [
          'Years passed, and Edgar Linton formally proposed marriage to Catherine.',
          'Cathy came into the kitchen to sit on the settle with Nelly Dean while Hindley was drinking at Gimmerton.',
          '"I love Edgar," Cathy said, looking into the embers. "He will be rich, and I shall be the greatest woman of the neighbourhood."',
          '"And what of Heathcliff, Miss Cathy?" asked Nelly.',
          '"It would degrade me to marry Heathcliff now," Cathy whispered. "So he shall never know how I love him: and that, not because he’s handsome, Nelly, but because he’s more myself than I am. Whatever our souls are made of, his and mine are the same; and Linton’s is as different as a moonbeam from lightning, or frost from fire."',
          'Unbeknownst to them, Heathcliff had been sitting behind the settle. Having heard only that it would degrade her to marry him, he rose silently and slipped into the night.'
        ]
      },
      {
        id: 'wh-ch8',
        chapterNumber: 8,
        title: 'The Storm and the Flight',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Heathcliff vanishes from Yorkshire for three long years.',
        content: [
          'When Cathy discovered Heathcliff was gone, she ran out into the tempest without hat or shawl, calling his name across the roaring moor until her voice cracked.',
          'A bolt of lightning split the ancient birch tree at the corner of the house, crushing the stone chimney in a roar of sparks and dust.',
          'Cathy was carried in burning with brain fever. For three years, no word came of Heathcliff.',
          'Cathy married Edgar Linton and went to live in the quiet, gentle elegance of Thrushcross Grange.'
        ]
      },
      {
        id: 'wh-ch9',
        chapterNumber: 9,
        title: 'The Return of Heathcliff',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1847',
        authorNote: 'Heathcliff returns transformed into a gentleman with vengeance in his eyes.',
        content: [
          'On a mellow September evening, Nelly Dean went down the garden path to fetch apples.',
          'A tall man stood by the gate in the shadow of the laurels, looking up at the lighted drawing-room windows.',
          'It was Heathcliff—but transformed: broad-shouldered, straight, dressed in gentleman’s dark cloth, with eyes that burned like coals under black brows.',
          'When Cathy saw him, she flew into his arms with wild, weeping joy, oblivious to Edgar Linton’s stiff aristocratic displeasure.',
          'Vengeance had begun: Heathcliff took up residence at Wuthering Heights, winning Hindley’s lands through gambling and setting his trap for Isabella Linton.'
        ]
      },
      {
        id: 'wh-ch10',
        chapterNumber: 10,
        title: 'Quiet Sleep Under the Heather',
        wordCount: 900,
        readTimeMinutes: 5,
        publishedDate: '1847',
        authorNote: 'Lockwood visits the three quiet graves on the churchyard slope.',
        content: [
          'I lingered round the graves, under that benign sky; watched the moths fluttering among the heath and harebells; listened to the soft wind breathing through the grass.',
          'The country folk swear on their Bibles that Heathcliff walks the moors with Cathy on rainy nights, hand in hand under the birch trees.',
          'Yet standing beside the green turf where Cathy, Edgar, and Heathcliff lay together at last, the moor wind was sweet and fragrant with wild clover.',
          'I wondered how any one could ever imagine unquiet slumbers for the sleepers in that quiet earth.'
        ]
      }
    ]
  },

  {
    id: 'great-expectations',
    slug: 'great-expectations',
    title: 'Great Expectations',
    synopsis: 'Charles Dickens’s unforgettable journey of Pip, a poor blacksmith’s apprentice on the Kent marshes who is plucked into high society by an anonymous benefactor, only to discover the true meaning of honor, love, and redemption.',
    author: 'Charles Dickens',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&q=80',
    coverAlt: 'A lonely boat moored beside a foggy river marshland at dawn.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Victorian', 'Redemption', 'Dickens', 'Classic Literature'],
    totalChapters: 10,
    rating: 5,
    readsCount: 3870,
    isPublicDomain: true,
    chapters: [
      {
        id: 'ge-ch1',
        chapterNumber: 1,
        title: 'The Convict on the Marshes',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1861',
        authorNote: 'Pip meets the escaped convict Magwitch in the misty churchyard.',
        content: [
          'My father’s family name being Pirrip, and my christian name Philip, my infant tongue could make of both names nothing longer or more explicit than Pip. So, I called myself Pip, and came to be called Pip.',
          'The dark flat wilderness beyond the churchyard was the marshes; and the low leaden line beyond that was the river; and the distant savage lair from which the wind was rushing was the sea.',
          '"Hold your noise!" cried a terrible voice, as a man started up from among the graves at the side of the church porch. "Keep still, you little devil, or I’ll cut your throat!"',
          'A fearful man, all in coarse grey, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints.'
        ]
      },
      {
        id: 'ge-ch2',
        chapterNumber: 2,
        title: 'Joe Gargery and the Forge',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1861',
        authorNote: 'Pip steals a pork pie and a file for the convict from Mrs. Joe’s larder.',
        content: [
          'My sister, Mrs. Joe Gargery, was more than twenty years older than I, and had established a great reputation with herself and the neighbours because she had brought me up "by hand."',
          'Having at that time to find out for myself what the expression meant, and knowing her to have a hard and heavy hand, I supposed that Joe Gargery and I were both brought up by hand.',
          'Joe was a fair man, with curls of flaxen hair on each side of his smooth face, and eyes of such a very undecided blue that they seemed to have some of the very whiteness of his blacksmith’s apron in them.',
          'He was a mild, good-natured, sweet-tempered, easy-going, foolish, dear fellow—a sort of Hercules in strength, and also in weakness.'
        ]
      },
      {
        id: 'ge-ch3',
        chapterNumber: 3,
        title: 'Satis House and Miss Havisham',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1861',
        authorNote: 'Pip is summoned to the decaying mansion of Miss Havisham.',
        content: [
          'I was summoned to Satis House, where Miss Havisham lived in locked seclusion. The iron courtyard was rusted and overgrown with rank grass.',
          'In an armchair beside a dressing-table sat the strangest lady I have ever seen, or shall ever see.',
          'She was dressed in rich materials—satins, and lace, and silks—all of white. Her shoes were white. And she had a long white veil dependent from her hair, and bridal flowers in her hair, but her hair was white.',
          'Everything that ought to be white had been white long ago, and had lost its lustre, and was faded and yellow. She had shrunk to skin and bone like a waxwork skeleton.',
          '"Do you know what I touch here?" she asked, laying her wasted hand on her left breast.',
          '"Yes, ma’am. Your heart."',
          '"Broken!" she cried with a ghastly smile.'
        ]
      },
      {
        id: 'ge-ch4',
        chapterNumber: 4,
        title: 'Estella and the Pride of Shame',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1861',
        authorNote: 'Estella mocks Pip’s coarse hands and thick boots.',
        content: [
          'Miss Havisham summoned a young lady who was beautiful, proud, and cold as an iceberg.',
          '"Play cards with this boy," Miss Havisham commanded her.',
          '"With this common labouring boy?" Estella sneered, dealing the cards with slender white fingers.',
          '"He calls the knaves, Jacks, this boy!" said Estella with disdain. "And what coarse hands he has! And what thick boots!"',
          'I had never thought of being ashamed of my hands before, but now I looked at them with a burning face, and despised the honest forge where Joe worked with hammer and tongs.'
        ]
      },
      {
        id: 'ge-ch5',
        chapterNumber: 5,
        title: 'The Secret Benefactor',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1861',
        authorNote: 'Mr. Jaggers arrives at the Three Jolly Bargemen with news of great wealth.',
        content: [
          'Years passed, and I was bound apprentice to Joe at the anvil. One evening, while we sat at the Three Jolly Bargemen, the formidable London lawyer Mr. Jaggers appeared.',
          '"I have the honour to inform you, Pip," said Jaggers, biting his large forefinger, "that you have Great Expectations."',
          '"It is the desire of a certain person, whose name must remain an absolute secret, that you be removed from your present sphere of life and brought up as a gentleman of fortune."',
          'My head spun with dizzying pride. I immediately believed that Miss Havisham was my secret patron, intending to make me rich and marry me to the lovely Estella.'
        ]
      },
      {
        id: 'ge-ch6',
        chapterNumber: 6,
        title: 'A Gentleman in London',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1861',
        authorNote: 'Pip enters London society and lives beyond his means with Herbert Pocket.',
        content: [
          'London was vast, gloomy, and crowded with omnibuses and fog. I took lodgings at Barnard’s Inn with Herbert Pocket, a delightful, warm-hearted companion.',
          'We acquired fine tailors, silk waistcoats, and expensive wine, piling up debts with careless ease.',
          'When honest Joe Gargery came to visit me in London in his stiff Sunday clothes, holding his hat like a bird’s nest, I was ashamed of his simple country manners and treated him with cold, snobbish condescension.',
          '"Pip, dear old chap," Joe said gently before he left, "life is made of ever so many partings welded together, and one man’s a blacksmith, and one’s a whitesmith, and one’s a goldsmith. You and me is best apart in London, Pip."'
        ]
      },
      {
        id: 'ge-ch7',
        chapterNumber: 7,
        title: 'The Midnight Visitor',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1861',
        authorNote: 'The convict Magwitch reveals himself as the true benefactor.',
        content: [
          'I was three-and-twenty years old. One stormy November night, while the rain lashed the Temple chambers and the wind roared down the chimney, a heavy step ascended the dark wooden stairs.',
          'A rough, weather-beaten man with iron-gray hair stood in the doorway, wearing a heavy sea-coat.',
          'He looked at me with tears in his eyes and reached out two trembling hands.',
          'It was the convict from the marshes!',
          '"Yes, Pip, dear boy!" he cried, falling on his knees and kissing my hand. "I made you! I was sent to Australia, worked in the bush, herded sheep, made thousands—and every guinea went to make my gentleman Pip!"',
          'The horror of that moment was unutterable. All my grand illusions fell into ashes: Miss Havisham had never cared for me, Estella was not meant for me, and all my wealth was bought with the blood and sweat of a hunted felon.'
        ]
      },
      {
        id: 'ge-ch8',
        chapterNumber: 8,
        title: 'The Flight on the Thames',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1861',
        authorNote: 'Pip attempts to smuggle Magwitch out of England on a rowing boat.',
        content: [
          'Magwitch had returned to England under penalty of death if discovered. With Herbert Pocket, I planned his escape.',
          'We rowed down the busy, coal-choked river Thames in a four-oared wherry, hiding the old convict under a blanket.',
          'As the Hamburg steamer approached in the grey morning fog, a police galley shot out from the reeds: "Pull up, in the Queen’s name!"',
          'In the struggle that followed, the steamer’s paddle-wheel struck the boat. Magwitch was dragged underwater and severely injured before being hauled into the police boat in chains.'
        ]
      },
      {
        id: 'ge-ch9',
        chapterNumber: 9,
        title: 'The Passing of Magwitch',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1861',
        authorNote: 'Pip attends the dying convict in Newgate prison.',
        content: [
          'Magwitch lay dying in the infirmary of Newgate prison. His breath was short and painful, but his eyes were full of peace when I sat beside his iron bed.',
          'All my former disgust had melted away into profound compassion and love.',
          'On his last day, I leaned down to his ear. "Dear Magwitch, you had a child once, whom you loved and lost."',
          'He pressed my hand feebly.',
          '"She lived and found powerful friends. She is living now. She is a lady and very beautiful. And I love her!"',
          'He raised my hand to his lips, smiled a smile of deepest gratitude, and fell asleep forever.'
        ]
      },
      {
        id: 'ge-ch10',
        chapterNumber: 10,
        title: 'The Forge and the Mists',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1861',
        authorNote: 'Pip returns to the forge, reconciles with Joe, and meets Estella in the ruins.',
        content: [
          'I fell into a dangerous fever, and woke to find dear Joe Gargery nursing me with the gentle touch of a mother, having paid all my debts with his honest savings.',
          'Years later, after earning my living by hard, honest work in the East, I returned to the marshes.',
          'I walked to the ruins of Satis House in the evening twilight. There, amidst the fallen bricks and blooming ivy, walked Estella.',
          'Suffering had softened her proud heart, teaching her what love and loss meant.',
          'We took hands, walked out of that ruined place, and as the morning mists had risen long ago when I first left the forge, so the evening mists were rising now, and in all the broad expanse of tranquil light they showed to me, I saw no shadow of another parting from her.'
        ]
      }
    ]
  },

  {
    id: 'frankenstein',
    slug: 'frankenstein',
    title: 'Frankenstein: The Modern Prometheus',
    synopsis: 'Mary Shelley’s foundational masterpiece of science fiction and Gothic tragedy. Victor Frankenstein unlocks the secret of life itself, only to abandon his creation to a world that responds with horror and vengeance.',
    author: 'Mary Shelley',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80',
    coverAlt: 'Thunder clouds and jagged lightning striking high snow-covered Alpine peaks in the dead of night.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Gothic', 'Science Fiction', 'Tragedy', 'Philosophy', 'Classic Literature'],
    totalChapters: 10,
    rating: 5,
    readsCount: 4290,
    isPublicDomain: true,
    chapters: [
      {
        id: 'fk-ch1',
        chapterNumber: 1,
        title: 'Letters from the Arctic Ice',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1818',
        authorNote: 'Captain Walton’s ship encounters the stranger trapped on a sledge in the frozen sea.',
        content: [
          'To Mrs. Saville, England. August 5th, 17—.',
          'We were nearly surrounded by ice, which closed in the ship on all sides, scarcely leaving her the sea-room in which she floated.',
          'About two o’clock the mist cleared away, and we beheld, stretched out in every direction, vast and irregular plains of ice, which seemed to have no end.',
          'Some of my comrades groaned, and my own mind began to grow watchful with anxious thoughts, when a strange sight suddenly attracted our notice and diverted our attention.',
          'We perceived a low carriage, fixed on a sledge and drawn by dogs, pass on towards the north, at the distance of half a mile; a being which had the shape of a man, but apparently of gigantic stature, sat in the sledge and guided the dogs.'
        ]
      },
      {
        id: 'fk-ch2',
        chapterNumber: 2,
        title: 'Youth in Geneva',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: '1818',
        authorNote: 'Victor begins the story of his idyllic childhood and his obsession with natural philosophy.',
        content: [
          'I am by birth a Genevese, and my family is one of the most distinguished of that republic.',
          'My companion from childhood was Elizabeth Lavenza, an orphan child of celestial beauty and gentle spirit whom my mother brought home to our villa on Lake Geneva.',
          'When I was thirteen years of age we all went on a party of pleasure to the baths near Thonon; the inclemency of the weather obliged us to remain a day confined to the inn.',
          'In this house I chanced to find a volume of the works of Cornelius Agrippa. I opened it with apathy; the theory which he attempts to demonstrate and the wonderful facts which he relates soon changed this feeling into enthusiasm.'
        ]
      },
      {
        id: 'fk-ch3',
        chapterNumber: 3,
        title: 'The Spark of Being',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1818',
        authorNote: 'At the University of Ingolstadt, Victor animates the creature on a dreary night in November.',
        content: [
          'It was on a dreary night of November that I beheld the accomplishment of my toils.',
          'With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet.',
          'It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open;',
          'it breathed hard, and a convulsive motion agitated its limbs.',
          'How can I describe my emotions at this catastrophe, or how delineate the wretch whom with such infinite pains and care I had endeavoured to form? His limbs were in proportion, and I had selected his features as beautiful. Beautiful! Great God!'
        ]
      },
      {
        id: 'fk-ch4',
        chapterNumber: 4,
        title: 'Flight and Horror',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1818',
        authorNote: 'Victor flees his laboratory and collapses in fever.',
        content: [
          'The beauty of the dream vanished, and breathless horror and disgust filled my heart.',
          'Unable to endure the aspect of the being I had created, I rushed out of the room and continued a long time traversing my bed-chamber, unable to compose my mind to sleep.',
          'At length lassitude succeeded to the tumult I had before endured, and I threw myself on the bed in my clothes, endeavouring to seek a few moments of forgetfulness.',
          'When morning came, I walked the streets of Ingolstadt in terror, fearing at every turn to behold the demon to which I had so miserably given life.'
        ]
      },
      {
        id: 'fk-ch5',
        chapterNumber: 5,
        title: 'Tragedy at Plainpalais',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1818',
        authorNote: 'Victor’s younger brother William is murdered.',
        content: [
          'A letter from my father summoned me home with terrible news: little William, our darling youngest brother, had been murdered in the woods of Plainpalais.',
          'I hurried to Geneva. It was dark when I arrived outside the city gates, and the storm raged over Mont Blanc with flashing lightning.',
          'A flash illuminated the object, and discovered its shape plainly to me; its gigantic stature, and the deformity of its aspect more hideous than belongs to humanity, instantly informed me that it was the wretch, the filthy dæmon, to whom I had given life.',
          'He was the murderer of my brother!'
        ]
      },
      {
        id: 'fk-ch6',
        chapterNumber: 6,
        title: 'The Meeting on the Sea of Ice',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1818',
        authorNote: 'Victor climbs the Mer de Glace and confronts his creation.',
        content: [
          'Seeking peace for my tormented soul, I journeyed alone through the valley of Chamounix and climbed the vast glacier known as the Mer de Glace.',
          'Suddenly, advancing across the fields of ice with superhuman speed, came the figure of the creature.',
          '"Devil!" I exclaimed. "Do you dare approach me? And do not you fear the fierce vengeance of my arm wreaked on your miserable head?"',
          '"I expected this reception," said the dæmon in a deep, sorrowful voice. "All men hate the wretched; how, then, must I be hated, who am miserable beyond all living things! Yet you, my creator, would tear me to pieces. Remember, thou hast made me more powerful than thyself; my height is superior to thine, my joints more supple. But I will not be tempted to set myself in opposition to thee. I am thy creature, and I will be even mild and docile to my natural lord and king if thou wilt also perform thy part, the which thou owest me."'
        ]
      },
      {
        id: 'fk-ch7',
        chapterNumber: 7,
        title: 'The Creature’s Tale: The De Lacey Cottage',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1818',
        authorNote: 'The monster describes observing the peasant family and learning language.',
        content: [
          '"I hid myself in a hovel adjoining a small, neat cottage," the creature related.',
          '"There lived an old blind man, his son Felix, and his daughter Agatha. Through a chink in the wood, I watched them daily.',
          'I saw their gentle love for one another, their poverty, and their tears. At night, I secretly cut wood and cleared the snow from their path to lighten their labor.',
          'By listening to their speech, I learned the names for bread, fire, milk, and love. My heart yearned to reveal myself to them, believing they would overlook my hideous deformity if they could only know the kindness of my soul."'
        ]
      },
      {
        id: 'fk-ch8',
        chapterNumber: 8,
        title: 'Cast Out by Mankind',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1818',
        authorNote: 'The creature is beaten and driven away, turning his benevolence to rage.',
        content: [
          '"One day when the youth were absent, I entered the cottage and spoke with the old blind man.',
          'He received me with touching kindness, for he could not see my yellow skin or watery eyes. But just as I fell on my knees before him, Felix entered.',
          'With a scream of horror, Felix struck me violently with a heavy stick. I could have torn him limb from limb, but my heart sank within me and I fled.',
          'From that moment I declared everlasting war against the species, and, more than all, against him who had formed me and sent me forth to this insupportable misery."'
        ]
      },
      {
        id: 'fk-ch9',
        chapterNumber: 9,
        title: 'The Broken Vow and the Wedding Night',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1818',
        authorNote: 'Victor destroys the companion, and the creature promises: "I shall be with you on your wedding night."',
        content: [
          'The monster demanded that I fashion him a female mate, with whom he might live in the deserts of South America.',
          'Terrified by the prospect of a race of demons propagating upon the earth, I tore the half-finished female form to pieces before his very eyes.',
          'The monster howled in despair and vanished, leaving behind the chilling prophecy: "I go; but remember, I shall be with you on your wedding-night."',
          'On that fateful night at Lake Como, while I stood guard outside the chamber with a pistol, a piercing scream rang out. Elizabeth lay strangled upon the bridal bed.'
        ]
      },
      {
        id: 'fk-ch10',
        chapterNumber: 10,
        title: 'The Final Slumber in the Ice',
        wordCount: 920,
        readTimeMinutes: 5,
        publishedDate: '1818',
        authorNote: 'The monster weeps over Victor’s body and departs into the Arctic waste.',
        content: [
          'Victor Frankenstein concluded his narrative, and two days later breathed his last aboard our frozen ship.',
          'That night, entering the cabin where his body lay, I found the gigantic creature weeping over the corpse.',
          '"Oh, Frankenstein! Generous and self-devoted being!" he moaned in agony. "What does it avail that I now ask thee to pardon me? I, who irretrievably destroyed thee by destroying all thou lovedst."',
          'He turned to me with eyes of desolate despair. "Fear not that I shall be the instrument of future mischief. I shall quit your vessel on the ice-raft which brought me thither, and shall seek the most northern extremity of the globe; I shall collect my funeral pile, and consume to ashes this miserable frame."',
          'He sprang from the cabin window upon the ice-raft which lay close to the vessel, and was soon borne away by the waves and lost in darkness and distance.'
        ]
      }
    ]
  },

  {
    id: 'emma',
    slug: 'emma',
    title: 'Emma',
    synopsis: 'Jane Austen’s delightful comedy of errors. Emma Woodhouse, handsome, clever, and rich, fancies herself an infallible matchmaker for Highbury society, blind to her own heart until Mr. Knightley holds up a mirror to her soul.',
    author: 'Jane Austen',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
    coverAlt: 'A quiet English manor library with tall windows overlooking blooming rose gardens.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Regency', 'Wit', 'Romance', 'Classic Literature'],
    totalChapters: 10,
    rating: 5,
    readsCount: 3740,
    isPublicDomain: true,
    chapters: [
      {
        id: 'em-ch1',
        chapterNumber: 1,
        title: 'Handsome, Clever, and Rich',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1815',
        authorNote: 'The famous opening introducing Emma Woodhouse of Hartfield.',
        content: [
          'Emma Woodhouse, handsome, clever, and rich, with a comfortable home and happy disposition, seemed to unite some of the best blessings of existence; and had lived nearly twenty-one years in the world with very little to distress or vex her.',
          'Her father was a nervous invalid, fond of gruel and terrified of drafts, whom Emma managed with infinite sweetness.',
          'Having just successfully matched her governess Miss Taylor with the agreeable Mr. Weston, Emma declared her intention of arranging another match without delay.'
        ]
      },
      {
        id: 'em-ch2',
        chapterNumber: 2,
        title: 'Mr. Knightley’s Rebuke',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: '1815',
        authorNote: 'Mr. Knightley warns Emma against playing with other people’s lives.',
        content: [
          'Mr. Knightley, a sensible man of about seven or eight-and-thirty, was not only a very old and intimate friend of the family, but was connected with it as the elder brother of Isabella’s husband.',
          'He was one of the few people who could see faults in Emma Woodhouse, and the only one who ever told her of them.',
          '"You have made a lucky guess, Emma," said Knightley, warm by the fire. "That is all that can be said. A lucky guess is not another name for wisdom."'
        ]
      },
      {
        id: 'em-ch3',
        chapterNumber: 3,
        title: 'Harriet Smith Adopted',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1815',
        authorNote: 'Emma takes the naive parlour-boarder under her wing.',
        content: [
          'Harriet Smith was the natural daughter of somebody, nobody knew whom, seventeen years old, and very pretty.',
          'Emma was enchanted by her sweet, pliable nature, and immediately decided to detach her from the honest young farmer Robert Martin and marry her to the vicar, Mr. Elton.',
          'Knightley protested vehemently, but Emma smiled with superior confidence.'
        ]
      },
      {
        id: 'em-ch4',
        chapterNumber: 4,
        title: 'The Portrait of Harriet',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1815',
        authorNote: 'Emma paints Harriet while Mr. Elton lavishes ambiguous compliments.',
        content: [
          'Emma drew a charming watercolour likeness of Harriet, while Mr. Elton stood over her shoulder sighing with excessive admiration.',
          'Emma believed every sigh was for Harriet; Elton believed Emma was encouraging his own suit.',
          'The stage was set for an inevitable collision of misunderstandings.'
        ]
      },
      {
        id: 'em-ch5',
        chapterNumber: 5,
        title: 'The Christmas Eve Carriage',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1815',
        authorNote: 'Mr. Elton proposes to Emma in the carriage returning from the Westons.',
        content: [
          'Returning from a snowy dinner at Randalls, Emma found herself alone in the carriage with Mr. Elton.',
          'To her utter horror, the vicar seized her hand, poured out a declaration of passionate love for herself, and laughed with outraged vanity when she mentioned Harriet Smith.',
          '"Miss Smith is a very good sort of girl, but I have no intention of throwing myself away on nobody’s daughter!"',
          'Emma returned to Hartfield humbled, mortified, and deeply remorseful for misleading poor Harriet.'
        ]
      },
      {
        id: 'em-ch6',
        chapterNumber: 6,
        title: 'The Arrival of Frank Churchill',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1815',
        authorNote: 'The charming stepson arrives in Highbury.',
        content: [
          'Frank Churchill brought youthful vitality, music, and gallantry to the village.',
          'He flirted with Emma with graceful ease, while Jane Fairfax, reserved and accomplished, kept her secrets behind the piano.',
          'Mr. Knightley watched Frank with critical eyes, suspecting a shallow and disingenuous character.'
        ]
      },
      {
        id: 'em-ch7',
        chapterNumber: 7,
        title: 'The Cruelty at Box Hill',
        wordCount: 910,
        readTimeMinutes: 5,
        publishedDate: '1815',
        authorNote: 'Emma’s thoughtless insult to Miss Bates on the summer picnic.',
        content: [
          'During the picnic at Box Hill, the conversation flagged under the hot sun.',
          'Frank Churchill proposed that each guest say something clever or three things very dull.',
          'Poor, garrulous Miss Bates laughed good-naturedly: "Three things very dull! That will be easy for me, I am sure to say three dull things as soon as ever I open my mouth."',
          '"Ah! Ma’am, but there may be a difficulty," cried Emma with thoughtless wit. "Pardon me, but you will be limited as to number—only three at once."',
          'Miss Bates blushed crimson and shrank into her chair.',
          'After dinner, Mr. Knightley confronted Emma alone under the trees: "Emma, I cannot see you act in a manner so ungenerous and so cruel without telling you of it. Were she your equal in fortune, it would be bad; but she is poor, she has sunk from the comfort she was born to! Badly done, Emma, badly done indeed!"',
          'Emma burst into tears of shame the moment she entered her carriage.'
        ]
      },
      {
        id: 'em-ch8',
        chapterNumber: 8,
        title: 'Secrets Unveiled',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1815',
        authorNote: 'The secret engagement of Frank Churchill and Jane Fairfax is revealed.',
        content: [
          'The village was stunned by the revelation that Frank Churchill and Jane Fairfax had been secretly engaged for months.',
          'Emma was relieved to find her own heart entirely untouched by Frank.',
          'Her horror returned, however, when Harriet Smith confessed that she was in love—not with Frank Churchill, but with Mr. Knightley!',
          'A sudden illumination flashed across Emma’s soul: "It darted through her with the speed of an arrow, that Mr. Knightley must marry no one but herself!"'
        ]
      },
      {
        id: 'em-ch9',
        chapterNumber: 9,
        title: 'The Shrubbery Walk',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1815',
        authorNote: 'Knightley proposes to Emma in the garden at Hartfield.',
        content: [
          'Mr. Knightley returned from London to console Emma, believing her heart broken by Frank Churchill.',
          'They walked together along the quiet gravel paths of the Hartfield shrubbery.',
          'When Emma assured him that she felt only friendship for Frank, Knightley’s composure broke.',
          '"I cannot make speeches, Emma," he said, taking her hand. "If I loved you less, I might be able to talk about it more. But you know what I am. You hear nothing but truth from me. I have blamed you, and lectured you, and you have borne it as no other woman in England would. God knows I have loved you in all your faults, from seventeen to twenty-one!"'
        ]
      },
      {
        id: 'em-ch10',
        chapterNumber: 10,
        title: 'Highbury Happiness',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1815',
        authorNote: 'Three weddings bring harmony to Highbury society.',
        content: [
          'Harriet Smith accepted a renewed proposal from the devoted Robert Martin, proving her sensible heart had returned to its proper sphere.',
          'Mr. Knightley agreed to leave his own magnificent estate and live at Hartfield so that Mr. Woodhouse would never have to part from his beloved daughter.',
          'The wedding was small and quiet, but in the bridal party’s eyes shone the perfect happiness of true understanding and lifelong devotion.'
        ]
      }
    ]
  },

  {
    id: 'sense-and-sensibility',
    slug: 'sense-and-sensibility',
    title: 'Sense and Sensibility',
    synopsis: 'Jane Austen’s contrasting study of two sisters: prudent, self-restrained Elinor (Sense) and romantic, passionate Marianne (Sensibility), who face heartbreak and social judgment before discovering mature happiness.',
    author: 'Jane Austen',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80',
    coverAlt: 'Delicate vintage letter writing paper with dried lavender and ink pen.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Regency', 'Romance', 'Sisterhood', 'Classic Literature'],
    totalChapters: 10,
    rating: 5,
    readsCount: 3620,
    isPublicDomain: true,
    chapters: [
      {
        id: 'ss-ch1',
        chapterNumber: 1,
        title: 'Loss of Norland Park',
        wordCount: 830,
        readTimeMinutes: 4,
        publishedDate: '1811',
        authorNote: 'The Dashwood family is reduced in fortune upon the death of Mr. Henry Dashwood.',
        content: [
          'The family of Dashwood had long been settled in Sussex.',
          'Upon the father’s death, the estate passed to John Dashwood, whose selfish wife Fanny convinced him to reduce his sisters’ inheritance from three thousand pounds to occasional gifts of game and fish.',
          'Mrs. Dashwood and her three daughters were forced to seek a modest cottage in Devonshire.'
        ]
      },
      {
        id: 'ss-ch2',
        chapterNumber: 2,
        title: 'Elinor and Marianne',
        wordCount: 820,
        readTimeMinutes: 4,
        publishedDate: '1811',
        authorNote: 'The contrasting natures of the two elder sisters.',
        content: [
          'Elinor, this eldest daughter, possessed a strength of understanding, and coolness of judgment, which qualified her, though only nineteen, to be the counsellor of her mother.',
          'Marianne’s abilities were, in many respects, quite equal to Elinor’s. She was sensible and clever; but eager in everything: her sorrows, her joys, could have no moderation.',
          'She had a generous heart, but despised all prudence and composure as cold and unfeeling.'
        ]
      },
      {
        id: 'ss-ch3',
        chapterNumber: 3,
        title: 'Barton Cottage in Devon',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1811',
        authorNote: 'The Dashwoods settle into their picturesque new home.',
        content: [
          'Barton Cottage was small, but comfortable, covered with dark thatch and surrounded by high green hills.',
          'Sir John Middleton welcomed them with hearty hospitality, introducing them to his mother-in-law, Mrs. Jennings, and the quiet, grave Colonel Brandon.',
          'Brandon, though only thirty-five, seemed to romantic seventeen-year-old Marianne like an ancient invalid whose life was over.'
        ]
      },
      {
        id: 'ss-ch4',
        chapterNumber: 4,
        title: 'Enter Willoughby',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1811',
        authorNote: 'Marianne falls in the rain and is carried home by the dashing young Willoughby.',
        content: [
          'Caught in a sudden downpour on the high down, Marianne slipped and twisted her ankle.',
          'A gentleman shooting with his dogs sprang forward, lifted her in his arms, and carried her all the way down the hill to the cottage.',
          'He was John Willoughby, handsome, youthful, passionate, and fond of poetry.',
          'Marianne surrendered her heart without a single reservation.'
        ]
      },
      {
        id: 'ss-ch5',
        chapterNumber: 5,
        title: 'Sudden Departure',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1811',
        authorNote: 'Willoughby leaves abruptly for London without a formal engagement.',
        content: [
          'Just when everyone expected an announcement of their marriage, Willoughby arrived at the cottage pale and agitated.',
          'He declared that Mrs. Smith had sent him to London on urgent business, and departed without explanation.',
          'Marianne abandoned herself to uncontrollable grief, playing mournful songs and refusing to eat or sleep.'
        ]
      },
      {
        id: 'ss-ch6',
        chapterNumber: 6,
        title: 'Lucy Steele’s Secret',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1811',
        authorNote: 'Lucy reveals her secret four-year engagement to Edward Ferrars.',
        content: [
          'During a visit from the Steele sisters, vulgar Lucy Steele confided a terrible secret to Elinor.',
          'She had been secretly engaged to Edward Ferrars—the man Elinor silently loved—for four long years!',
          'Elinor’s heart broke, yet she exerted superhuman self-command, concealing her agony from her mother and sister to spare their feelings.'
        ]
      },
      {
        id: 'ss-ch7',
        chapterNumber: 7,
        title: 'Heartbreak at the London Ball',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1811',
        authorNote: 'Marianne confronts Willoughby in London and receives a cruel rejection.',
        content: [
          'At a crowded assembly in London, Marianne saw Willoughby across the room.',
          'She rushed toward him, but he greeted her with icy formality and introduced his wealthy fiancée, Miss Grey.',
          'The next day, a cruel letter arrived returning Marianne’s letters and lock of hair.',
          'Marianne collapsed into hysterics, while Elinor nursed her with tender fortitude.'
        ]
      },
      {
        id: 'ss-ch8',
        chapterNumber: 8,
        title: 'The Fever at Cleveland',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1811',
        authorNote: 'Marianne falls desperately ill with putrid fever.',
        content: [
          'On the journey home, staying at the Palmers’ estate at Cleveland, Marianne walked in the twilight rain and caught a violent putrid fever.',
          'For two nights her life hung by a thread.',
          'Colonel Brandon rode through the night to fetch Mrs. Dashwood from Devonshire.',
          'Willoughby arrived in remorseful desperation, confessing to Elinor that he had loved Marianne truly, but sold himself to Miss Grey to pay his debts.'
        ]
      },
      {
        id: 'ss-ch9',
        chapterNumber: 9,
        title: 'Edward is Free',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1811',
        authorNote: 'Lucy marries Robert Ferrars instead, leaving Edward free.',
        content: [
          'When Edward was disinherited by his mother, mercenary Lucy Steele abandoned him and married his vain younger brother Robert instead!',
          'Edward rode straight to Barton Cottage to lay his heart at Elinor’s feet.',
          'Elinor, who had maintained quiet composure through months of sorrow, burst into tears of overwhelming joy.'
        ]
      },
      {
        id: 'ss-ch10',
        chapterNumber: 10,
        title: 'Wisdom and Peace',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1811',
        authorNote: 'Elinor marries Edward, and Marianne discovers true devotion with Colonel Brandon.',
        content: [
          'Marianne, humbled and matured by suffering, learned to value the quiet, heroic fidelity of Colonel Brandon over shallow romantic rhetoric.',
          'Two years later, she married the Colonel at the altar of Delaford church.',
          'Between the two sisters and their husbands existed the most uninterrupted harmony, proving that true happiness unites both sense and sensibility.'
        ]
      }
    ]
  },

  {
    id: 'a-tale-of-two-cities',
    slug: 'a-tale-of-two-cities',
    title: 'A Tale of Two Cities',
    synopsis: 'Charles Dickens’s gripping historical epic set against the backdrop of the French Revolution. Love, vengeance, and the supreme sacrifice in the shadow of the guillotine bind London and Paris forever.',
    author: 'Charles Dickens',
    authorRole: 'Classic Public Domain Author',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    coverAlt: 'The silhouette of Paris rooftops and Notre Dame cathedral at twilight.',
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Public Domain', 'Historical', 'French Revolution', 'Sacrifice', 'Classic Literature'],
    totalChapters: 10,
    rating: 5,
    readsCount: 4530,
    isPublicDomain: true,
    chapters: [
      {
        id: 'ttc-ch1',
        chapterNumber: 1,
        title: 'The Best of Times, The Worst of Times',
        wordCount: 860,
        readTimeMinutes: 4,
        publishedDate: '1859',
        authorNote: 'The timeless philosophical opening comparing London and Paris in 1775.',
        content: [
          'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
          'There were a king with a large jaw and a queen with a plain face, on the throne of England; there were a king with a large jaw and a queen with a fair face, on the throne of France.',
          'In both countries it was relatively clear that things in general were settled for ever.'
        ]
      },
      {
        id: 'ttc-ch2',
        chapterNumber: 2,
        title: 'Recalled to Life',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1859',
        authorNote: 'Mr. Jarvis Lorry carries the message to Dover and rescues Dr. Manette in Paris.',
        content: [
          'Mr. Jarvis Lorry of Tellson’s Bank journeyed through the Dover fog with a secret message: "Recalled to life."',
          'In a garret in the Saint Antoine quarter of Paris, they found Dr. Alexandre Manette, who had been buried alive in the Bastille for eighteen years.',
          'The old man sat on a low stool making shoes, his white hair long and his mind shattered, until his daughter Lucie’s golden hair brought back the memories of light.'
        ]
      },
      {
        id: 'ttc-ch3',
        chapterNumber: 3,
        title: 'The Trial at the Old Bailey',
        wordCount: 880,
        readTimeMinutes: 4,
        publishedDate: '1859',
        authorNote: 'Charles Darnay is tried for treason and saved by Sydney Carton’s resemblance.',
        content: [
          'At the Old Bailey courthouse, Charles Darnay was tried for treason against the British Crown.',
          'The case seemed hopeless until Sydney Carton, a dissipated, brilliant barrister who sat staring at the ceiling, pointed out his extraordinary physical resemblance to the prisoner.',
          'Darnay was acquitted, but Carton looked into his wine glass that night with bitter self-loathing, seeing in Darnay everything he might have been.'
        ]
      },
      {
        id: 'ttc-ch4',
        chapterNumber: 4,
        title: 'The Golden Thread',
        wordCount: 850,
        readTimeMinutes: 4,
        publishedDate: '1859',
        authorNote: 'Lucie weaves peace around her father, Darnay, and Carton in Soho.',
        content: [
          'In the quiet London home in Soho, Lucie Manette was the golden thread that bound her father back to health and joy.',
          'Charles Darnay won her hand, but Carton remained a faithful, silent friend.',
          'Carton wept before Lucie, making a solemn vow: "For you, and for any dear to you, I would do anything. Remember that there is a man who would give his life to keep a life you love beside you."'
        ]
      },
      {
        id: 'ttc-ch5',
        chapterNumber: 5,
        title: 'The Storm Bursts in Saint Antoine',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1859',
        authorNote: 'The storming of the Bastille in 1789.',
        content: [
          'In Paris, the wine cask broke on the cobbles of Saint Antoine, staining the stones blood-red.',
          'Madame Defarge knitted her grim registry of death, stitch by stitch.',
          'On July 14, 1789, the oppressed sea of humanity rose in fury and stormed the Bastille.',
          'Defarge searched cell One Hundred and Five, North Tower, where Dr. Manette had hidden a written parchment.'
        ]
      },
      {
        id: 'ttc-ch6',
        chapterNumber: 6,
        title: 'Drawn to the Loadstone Rock',
        wordCount: 840,
        readTimeMinutes: 4,
        publishedDate: '1859',
        authorNote: 'Darnay returns to revolutionary Paris to save his old servant Gabelle.',
        content: [
          'Charles Darnay was by birth the Marquis St. Evrémonde, though he had renounced his cruel family’s titles and estate.',
          'A desperate letter from Gabelle, imprisoned by the revolutionaries, drew Darnay to Paris like a ship drawn to a magnetic rock.',
          'The moment he crossed the frontier, he was seized as an emigrant and cast into the prison of La Force.'
        ]
      },
      {
        id: 'ttc-ch7',
        chapterNumber: 7,
        title: 'The Shadow of the Guillotine',
        wordCount: 870,
        readTimeMinutes: 4,
        publishedDate: '1859',
        authorNote: 'La Guillotine reigns supreme in Paris.',
        content: [
          'The Reign of Terror gripped France. The holy guillotine sheared off heads daily, fed by the knitting women who counted the falling blades.',
          'Dr. Manette, revered as a former Bastille prisoner, managed to save Darnay at his first tribunal.',
          'Within hours, however, Darnay was re-arrested on a new charge denounced by the Defarges and a third, unnamed accuser.'
        ]
      },
      {
        id: 'ttc-ch8',
        chapterNumber: 8,
        title: 'The Paper from the Bastille',
        wordCount: 890,
        readTimeMinutes: 5,
        publishedDate: '1859',
        authorNote: 'Dr. Manette’s parchment condemns the house of Evrémonde to extermination.',
        content: [
          'In the courtroom, Defarge produced the manuscript found in cell One Hundred and Five.',
          'It told the horrifying story of how the twin Evrémonde brothers had raped a peasant girl, murdered her brother, and buried Dr. Manette in the Bastille when he attempted to report their crime.',
          'The parchment ended with a curse upon the entire Evrémonde race.',
          'Darnay was unanimously sentenced to the guillotine within twenty-four hours.'
        ]
      },
      {
        id: 'ttc-ch9',
        chapterNumber: 9,
        title: 'Fifty-Two Heads for the Blade',
        wordCount: 920,
        readTimeMinutes: 5,
        publishedDate: '1859',
        authorNote: 'Sydney Carton switches places with Darnay in the Conciergerie.',
        content: [
          'Sydney Carton walked the streets of Paris at night, repeating the words of Christ: "I am the Resurrection and the Life."',
          'Using a secret hold over the spy Barsad, Carton gained admittance to Darnay’s cell.',
          'He drugged Darnay with chloroform, traded clothes with him, and had Barsad carry the unconscious Darnay out to the waiting carriage with Lucie and her father.',
          'Carton stood in the cell in Darnay’s place, calm, steadfast, and redeemed.'
        ]
      },
      {
        id: 'ttc-ch10',
        chapterNumber: 10,
        title: 'A Far, Far Better Thing',
        wordCount: 940,
        readTimeMinutes: 5,
        publishedDate: '1859',
        authorNote: 'The iconic final thoughts of Sydney Carton on the scaffold.',
        content: [
          'In the tumbril rolling toward the scaffold, a poor seamstress recognized that Carton was not Darnay.',
          '"Are you dying for him?" she asked, her hand trembling.',
          '"And his wife and child," Carton answered gently, holding her cold fingers.',
          'As the blade fell, Carton’s soul beheld a vision of a regenerated Paris, and of Lucie’s children naming a boy after him who would live a noble, honored life.',
          '"It is a far, far better thing that I do, than I have ever done; it is a far, far better rest that I go to than I have ever known."'
        ]
      }
    ]
  }
];
