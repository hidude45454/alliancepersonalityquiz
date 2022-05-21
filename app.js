(function(){
  function buildQuiz(){
    const output = [];
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        const answers = `<p>${currentQuestion.leftside}: <span class="sliderValLeft"></span> <span class="rightside">${currentQuestion.rightside}: <span class="sliderValRight"></span></span></p>
        <div class="slidecontainer">
          <input type="range" min="0" max="100" value="50" class="slider" name="question${questionNumber}">
        </div>`;
        output.push(
          `<div class="slide slide${questionNumber}">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers} </div>
          </div>`
        );
      }
    );
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){
    var container = document.getElementsByClassName("quiz-container")[0];
    container.remove();
    slides[currentSlide].classList.remove('active-slide');
    previousButton.style.display = 'none';
    nextButton.style.display = 'none'; 
    submitButton.style.display = 'none';
    const allianceAnswers = {
      "Rose": [100, 3, 58, 50, 33, 60, 85, 20, 85, 50, 20, 90, 91],
      "The Knights Radiant": [98, 12, 83, 95, 20, 70, 80, 10, 100, 60, 75, 100, 46],
      "The Syndicate": [88, 4, 67, 75, 90, 90, 70, 65, 50, 75, 55, 95, 0],
      "The Immortals": [95, 64, 58, 50, 85, 10, 90, 60, 55, 80, 70, 75, 0],
      "Cataclysm": [91, 73, 75, 90, 80, 70, 100, 0, 100, 50, 65, 95, 100],
      "The Fighting Pacifists": [86, 6, 42, 30, 10, 20, 50, 10, 70, 80, 40, 80, 0],
      "Eclipse": [83, 73, 92, 70, 40, 35, 80, 5, 40, 30, 65, 85, 61],
      "The Commonwealth": [75, 28, 50, 45, 20, 75, 90, 60, 50, 50, 0, 65, 4],
      "Bourbon Street": [84, 89, 42, 40, 10, 25, 70, 0, 50, 50, 20, 45, 46],
      "Grumpy Old Bastards": [36, 27, 92, 70, 100, 100, 0, 0, 90, 0, 70, 85, 0],
      "Guardian": [50, 0, 100, 10, 50, 100, 35, 0, 60, 50, 65, 40, 0],
      "Aurora": [58, 47, 58, 100, 40, 45, 80, 10, 40, 40, 85, 60, 0],
      "Carthago": [73, 53, 58, 70, 30, 30, 80, 20, 90, 50, 80, 65, 97],
      "Terminus Est": [34, 65, 83, 70, 67, 42, 67, 8, 17, 33, 45, 55, 0],
      "Weebunism": [65, 61, 83, 60, 30, 10, 80, 25, 70, 60, 75, 50, 0],
      "The Hand of Fate": [42, 91, 100, 70, 75, 35, 40, 40, 40, 60, 95, 70, 100],
      "The Legion": [58, 75, 33, 20, 40, 60, 30, 10, 30, 75, 35, 20, 21],
      "The Wei": [56, 13, 50, 80, 40, 20, 60, 10, 70, 85, 25, 55, 100],
      "Black Knights": [68, 5, 75, 50, 50, 50, 100, 0, 100, 50, 80, 55, 100],
      "Soldiers of Liberty": [75, 66, 33, 20, 10, 75, 50, 25, 95, 50, 30, 15, 27],
      "Dark Brotherhood": [55, 37, 67, 0, 10, 50, 80, 70, 40, 65, 25, 10, 47],
      "House Stark": [55, 29, 50, 20, 65, 65, 100, 40, 73, 50, 50, 30, 100],
      "Waffle House": [61, 83, 33, 70, 60, 50, 90, 30, 70, 80, 50, 45, 33],
      "Camelot": [58, 51, 50, 50, 60, 80, 30, 60, 60, 100, 50, 20, 63],
      "Name Withheld": [32, 83, 92, 15, 80, 45, 80, 50, 55, 65, 30, 10, 100],
      "Order of the White Rose": [25, 21, 33, 20, 40, 30, 85, 30, 95, 30, 45, 15, 18],
      "The Dead Rabbits": [41, 74, 58, 25, 80, 70, 85, 5, 60, 70, 25, 20, 60],
      "United Purple Nations": [38, 0, 42, 35, 75, 50, 25, 10, 50, 50, 20, 45, 20],
      "The Enterprise": [56, 48, 67, 30, 30, 60, 70, 20, 70, 55, 55, 0, 100],
      "The Elites": [59, 86, 25, 15, 10, 50, 80, 40, 70, 80, 0, 0, 36],
      "Federated States of Orbis": [46, 90, 50, 15, 10, 35, 60, 40, 80, 50, 10, 10, 27],
      "Serpentis": [40, 89, 50, 30, 10, 40, 80, 10, 50, 40, 85, 0, 79],
      "The Armed Peacekeepers": [60, 85, 42, 15, 5, 50, 75, 25, 50, 60, 40, 0, 67],
      "Arrgh": [53, 5, 58, 100, 30, 45, 70, 60, 75, 80, 100, 25, 85],
      "Farkistan": [0, 8, 0, 10, 20, 90, 25, 5, 40, 25, 15, 10, 0],
      "Church Of Atom": [0, 47, 50, 5, 80, 80, 70, 10, 20, 50, 35, 10, 0],
      "Global Alliance & Treaty Organization": [31, 73, 42, 35, 65, 85, 60, 40, 75, 75, 15, 10, 31],
      "Polaris": [10, 20, 58, 35, 0, 75, 85, 5, 50, 50, 25, 35, 61],
      "Hogwarts": [22, 92, 50, 50, 75, 25, 60, 60, 75, 90, 25, 30, 13],
      "Unforgiven Legion": [26, 63, 25, 15, 50, 35, 60, 30, 60, 40, 30, 5, 12],
      "United Socialist Nations": [39, 21, 42, 10, 45, 30, 85, 3, 75, 35, 40, 15, 53],
      "Yarr": [0, 34, 25, 5, 100, 100, 0, 10, 20, 50, 0, 0, 0],
      "The Federation": [0, 47, 25, 10, 5, 25, 30, 80, 69, 50, 30, 15, 52],
      "Union of Soviet Socialist Republics": [27, 87, 33, 0, 20, 50, 90, 70, 70, 80, 20, 0, 10],
      "Respublica Romana": [0, 52, 25, 0, 95, 90, 25, 0, 25, 90, 5, 0, 0],
      "Genesis": [16, 86, 8, 10, 80, 50, 50, 90, 30, 50, 5, 0, 2],
      "Sanctuary": [11, 85, 0, 15, 30, 69, 70, 3, 35, 50, 10, 0, 31],
      "Morningstar": [0, 66, 67, 5, 90, 0, 15, 0, 30, 69, 80, 0, 23],
      "Oblivion": [0, 39, 100, 30, 100, 70, 75, 5, 15, 70, 90, 55, 0],
      "Apollo": [0, 95, 83, 15, 10, 20, 30, 40, 70, 100, 65, 0, 88],
      "Otaku Shougaku": [8, 87, 83, 15, 0, 10, 40, 25, 50, 75, 75, 0, 41],
      "The Mortals": [5, 76, 50, 15, 40, 10, 90, 40, 50, 80, 70, 0, 76],
      "Convent of Atom": [28, 74, 42, 15, 5, 50, 70, 40, 80, 80, 35, 0, 58],
      "The Circus": [0, 96, 83, 65, 50, 10, 50, 20, 80, 80, 95, 20, 100],
      "The Cosmonauts": [15, 87, 33, 15, 35, 30, 50, 0, 60, 10, 10, 10, 1],
      "Daedalus": [0, 82, 50, 15, 40, 40, 90, 10, 40, 50, 65, 0, 50],
    };
    const allianceNames = Object.keys(allianceAnswers);
    const allianceFlags = [
      "https://politicsandwar.com/uploads/44281a3850798414f684dd71788f77f00934c81a500x300138.png",
      "https://politicsandwar.com/uploads/1ab161553c17912765716fddd8da7ec96c4a93a5500x300173.png",
      "https://politicsandwar.com/uploads/4943f976375bf77cafa3a32b9df7772dd8d5da1a500x300258.png",
      "https://politicsandwar.com/uploads/116d84b394b17c1268802788270d33c81370a6ebx767.png",
      "https://politicsandwar.com/uploads/f6664043f43de0a35b488e7fe515bfdd14ba0b0b500x333126.png",
      "https://politicsandwar.com/img/imgur-old/e615124b5ba48f1706ed7c822a749cdc89280a89711.png",
      "https://politicsandwar.com/uploads/eccfba9efe96bdb092626862cb87b615c8245c61x886.gif",
      "https://politicsandwar.com/uploads/e22ede7678a0335b17bc4a5b099a9647af82b97c500x270970.png",
      "https://politicsandwar.com/uploads/a060341ddb3c7e7f7038510de31201f14295c7c5500x300534.png",
      "https://politicsandwar.com/uploads/c3c6b42d867ffd38eafedaf07cdfda4469e82998454.png",
      "https://politicsandwar.com/img/imgur-old/200afe185770407ae6a603ade7ba9bfbad379813917.png",
      "https://politicsandwar.com/uploads/a5b0161b04704c3a80273041a3d613807015be24500x281702.jpg",
      "https://politicsandwar.com/uploads/9a7bcddab032abc1922f8e0821535c6b83e02067x723.png",
      "https://politicsandwar.com/uploads/81d8cb1c9bbc1e79a04d44c72f6012b57e95b1aa500x300926.png",
      "https://politicsandwar.com/uploads/4ab3fc36a5daf2e585c8ea6a00ac21ee8e7ec04d500x300622.png",
      "https://politicsandwar.com/uploads/edcab00901317bd2b386ea4dd4ddd6d4958b58bf500x300991.png",
      "https://politicsandwar.com/uploads/8a7c1bf4941cd42ee3ab2b2f557a18673b53e9aex871.png",
      "https://politicsandwar.com/uploads/03e7022940009f224763303b4fb7c224401009e5500x300666.jpg",
      "https://politicsandwar.com/img/imgur-old/917568acf2b88122f2e687d5bcfe41c8db855e95744.png",
      "https://politicsandwar.com/uploads/a520e30f32650b5855bf69b878f6e22f1df9a9dc500x300480.png",
      "https://politicsandwar.com/uploads/3af8f5023602b9d1cd12588b7d379a0f9f896e43586.png",
      "https://politicsandwar.com/uploads/2ca6c0f6672ee005f4b613520ad75bc63e9af00a500x333751.jpg",
      "https://politicsandwar.com/uploads/a9c2c9fc2ab14e0b003f5e65dc1f10cd7b2323fb500x275981.jpeg",
      "https://politicsandwar.com/uploads/18336703d151779287112c3a4ee0c2a4b3465d2e500x300251.png",
      "https://politicsandwar.com/uploads/20f4dc7f5468395aeb4bf85069c09f545cd267c7500x298877.png",
      "https://politicsandwar.com/uploads/df37fe596437c09410b1148dfc0a23c474cb1160500x300359.png",
      "https://politicsandwar.com/uploads/c82c8220ba1f0c69ad694f4b0c2ce28a8fba5391x908.jpg",
      "https://politicsandwar.com/uploads/7b344dbae82ec4d46732f07d75c9def0aac04391500x319696.png",
      "https://politicsandwar.com/uploads/8a61e23ce14f9c3ae1a81548a7296a640477af01x691.jpg",
      "https://politicsandwar.com/uploads/7cdd3d01c45feb1ff27745c9f72d7ab26daa0884x746.jpg",
      "https://politicsandwar.com/uploads/d31ac957e405ffd4ae2f551a5c8df955ef95d977500x300669.jpg",
      "https://politicsandwar.com/uploads/b86cddce18a6c83ca99b09eae9cd5f6c7b8d490c500x281987.jpeg",
      "https://politicsandwar.com/uploads/605a88b5dd09ad8afe646e9cbff512684dc8aa8bx511.png",
      "https://politicsandwar.com/img/imgur-old/c4ad8a85a57d1fedc2df54ac0d34bc882a83b441644.png",
      "https://politicsandwar.com/uploads/100fe13335b6c085e46e699bf8d856d1ee996207315.png",
      "https://politicsandwar.com/uploads/a18a33770a8efb8ce21bf21468d6f7d404e73392500x333798.png",
      "https://politicsandwar.com/uploads/1a556a2df74d80c433750ae891e8bac0f0469fdax532.png",
      "https://politicsandwar.com/img/imgur-old/a69030707aac568c9eb564ed58dfa6bacfa34da5165.png",
      "https://politicsandwar.com/uploads/287e446b0db70252e5f410de4f34e3d963d4876f500x300140.png",
      "https://politicsandwar.com/uploads/36d61fd23dfb027646186fdc247776350be7ddc8500x329366.jpg",
      "https://politicsandwar.com/uploads/b359bc0758d97a417b49d116c1e147674fdfa9b3500x3003.png",
      "https://politicsandwar.com/uploads/57056016e0494b5e9e860188582d4db5ac119883500x333979.png",
      "https://politicsandwar.com/uploads/bb7d4269a0b1df30032995f5d901db110a16bf73500x300919.png",
      "https://politicsandwar.com/uploads/6bcd8aaec61fb540c5ce901185cac4b36459e8c4500x300215.png",
      "https://politicsandwar.com/uploads/39f0baf448344386f2e89289cf73726f6bad8891x353.jpg",
      "https://politicsandwar.com/uploads/531b95cf1832b83251d1a4985445804bf5fdd816250x148181.png",
      "https://politicsandwar.com/uploads/d0140d1a6f4ce4487051c6bab51f7ce96eaf3dd4500x300965.png",
      "https://politicsandwar.com/uploads/71fa2df73a9bb2972e6b93d8a865aad33d11f3dax152.gif",
      "https://politicsandwar.com/uploads/a8910306b92fbce80d563dd429150b593f7cc575102.jpg",
      "https://politicsandwar.com/uploads/01ff0ba8071d73f87dbec43d1ccfb5d6a9765887x916.png",
      "https://politicsandwar.com/uploads/2443f0b66b28ba2e1cb7e63c98225da78f98ca7ex582.jpg",
      "https://politicsandwar.com/uploads/29391cc46b88243fb532bd7ceabe958d1a4ab9f0500x333380.jpg",
      "https://politicsandwar.com/uploads/3be8eda535bbda4aa19bcc9d957141892af7fbbf500x333368.png",
      "https://politicsandwar.com/uploads/d7ad3d6f7bc0f7153957574b43ecb968cfdfd1ce500x274620.gif",
      "https://politicsandwar.com/uploads/24f6ce38525fecb16a8f889760e66c0f2b3d4ff2500x300880.png",
      "https://politicsandwar.com/uploads/84c124c04ff2a94ef8e8d22c21645c9ca5703124x676.jpg",
    ];
    const allianceDescriptions = [
      "Rose is a longtime (albeit slightly more withdrawn) power player within the game. They have one of the strongest internal affairs and city building programs in the game.",
      "TKR has long been at the forefront of game politics as a dominant power. They are known for being more aggressive than the norm and unique use of Slack and forums.",
      "tS is a powerful meta trendsetter and has some of the most well-trained members within the game. They pride themselves on being fairly exclusive and proactive.",
      "TI is one of the \"newer\" large mass recruitment alliances with a strong lower tier. They hold one of the most active communities in the game and continue to show desire to grow.",
      "Cataclysm is the newest major power in the game and leads a competent, offensive-minded political sphere. They use tech extensively and are also an influential political player.",
      "TFP is a fairly old mass recruitment alliance currently charting its own path. Although more often known for the \"pacifist\" part of their name, they've also shown a willingness to start wars.",
      "Eclipse is a fairly new mass recruitment alliance vying to become a dominant political power through it and its extensions. They have one of the most competent government lineups in the game.",
      "TCW is a primarily defensive-minded alliance rebranded many years ago from an alliance called the Green Protection Agency. They boast a low tax rate and member sovereignty and unity.",
      "Bourbon Street is a new low-tier alliance founded from the merging of IKEA and the Ampersand. They are currently charting a course for growth and development.",
      "Grumpy Old Bastards is the dominant whale-tier alliance in the game, known for its whopping 40+ city average. Its selection of whales is exclusive, and the name very much fits the alliance.",
      "Guardian is one of the oldest alliances in the game. The alliance is one of the most competent in the game, with both experienced veterans and motivated newbies.",
      "Aurora is a politically dynamic and high-profile alliance. Their membership and political affiliation changes quicker than most, as they are always willing to try new things.",
      "CTO is a politically active mid-tier alliance that focuses on efficiency in uniformity. CTO members have created or run some of the most well-known game services, including CTOwned and RON.",
      "TEst is a strong whale-tier alliance and subsidiary of Eclipse with a prolific city-growth circle. Founded as a rival to Grumpy, they have charted their own unique community and political path.",
      "Weebunism is a militarily competent mid-tier alliance composed of (as the name suggests) weebs and otakus. They have shown a propensity for growth and openness towards trying new things.",
      "HoF is a powerful mid/high-tier alliance known for its independent streak, love for war, and politically incorrect culture. Most members are seasoned pirates and operate outside the box.",
      "The Legion is a fast-growing Roman-themed alliance with a community initially ported from a different game called CyberNations.",
      "The Wei is a longtime dynamic alliance that combines a mix of both new and experienced players. They are currently looking to refresh themselves with a new image and path.",
      "BK is a low/mid-tier alliance and a revitalization of the original BK from before entering an era of dominant yet politically corrupt rule. Meme culture and \"ayy lmao\"s are prevalent.",
      "SoL is a low-tier mass recruitment alliance that doesn't require Discord to join. They're still learning the ropes a bit, but working towards it well.",
      "DB is a low/mid-tier alliance that focuses more on internal unity but keeps a very quiet external profile. Underrated in competence, they're often a top performer within their sphere.",
      "HS is a Game of Thrones-themed alliance and prides itself on being a devoted and loyal ally, especially with its longtime ally tS.",
      "WH is a relatively new representative democracy with fairly big aspirations within its current sphere. Many members within its community dedicate themselves to improving the game as a whole.",
      "Camelot is a controversial but politically independent and experienced alliance. Their leader, Epimetheus, is a polarizing figure in Orbis but also runs a popular PnW Youtube channel.",
      "NW is an SCP-themed exclusive and highly competent newer alliance on the rise. Their internal growth and military ability are both notable.",
      "OWR is a mature and experienced alliance that focuses internally on its unity and community, and are an honorable ally,",
      "5P is an alliance themed after an Irish-American mob and is a fairly new and upcoming alliance.",
      "UPN is one of the oldest and most experienced alliances in the game and was once a major political power. They are a representative democracy.",
      "eS is tS's high-standard and rigorous training alliance and are one of the best training alliances in the game. Almost all members, no matter the size, must go through eS first before joining tS.",
      "The Elites is a new and quickly growing micro alliance with a focus on internal community. They aren't as experienced as most, but certainly have the ability to grow.",
      "FSO is a fairly new low-tier alliance and one of the biggest proponents of democracy and freedom in the game. They're learning the ropes a bit and have shown a willingness to do so.",
      "Serpentis is Aurora's training alliance as a result of a semi-failed merger, but still operates on the same principles of dynamism and growth that Aurora does.",
      "TAP is TFP's training alliance and one of the largest training alliances in the game. They are defensive in nature and focus on new nation growth, and have produced a few notable successes.",
      "Arrgh is the oldest and most successful pirate alliance in the game, and unconventionally prioritizes raiding and war more than any other alliance.",
      "Fark is a casual and nuke-friendly alliance themed on a community website of the same name. Being an older alliance, their members are generally older and more mature than most.",
      "CoA is a nuclear-cult themed mid/high-tier alliance formed by older community members.",
      "GATO is a democratic and defensive-minded alliance originally ported from another game called CyberNations.",
      "Polaris is an older alliance originally ported from another game called CyberNations. Historically controversial, they have recently charted a new path and are revamping their public image.",
      "Hogwarts is a very young Harry-Potter themed alliance with a seasoned government but mostly new membership base looking to prove themselves in the future.",
      "UL is a recent top 50 Roman-themed alliance with a community-oriented and ally-oriented focus.",
      "USN is a Marxist-Leninist alliance that works to advance all communist and socialist interests within the game.",
      "Yarr is a whale-tier econ-focused alliance where many former Arrgh pirates have retired. Members accepted into Yarr probably had very strong connections to the previous membership.",
      "TFed is a fairly established absolute monarchy with a close-knit community and strong internal focus.",
      "USSR is a communist and socialist alliance operating off principles from Russian and Chinese ideology.",
      "RnR is a Roman-themed high-tier only alliance that focuses on growth and avoids war when possible.",
      "Genesis is a new Christian and democratic alliance with a notable focus on internal roleplay.",
      "Sanctuary is a relatively new democratic alliance working on finding their feet in the game.",
      "Morningstar is a small, occult-themed alliance that serves as home to many controversial players that may not feel welcome in other alliances but have found a home with each other.",
      "Oblivion is an exclusive military powerhouse known for punching far above its weight. They are regarded as one of, if not the most militarily competent alliances in the game.",
      "Apollo is Eclipse's relatively new training alliance and one of the better quality training alliances in the game.",
      "Otaku Shougaku is Weebunism's training alliance and serves as a fairly successful platform for newer members to jump to the main alliance.",
      "The Mortals is TI's training alliance and one of the more active and decent training alliances in the game.",
      "Convent of Atom is CoA's training alliance and one of the larger and more casual training alliances in the game.",
      "The Circus is a prominent and relatively new pirate alliance formed as a merger between two very recently prolific pirate alliances. Expect to see them in almost every conflict.",
      "The Cosmonauts is a space-themed alliance that recently hit the top 50 as a result of a merger and is currently working to find its feet in the game.",
      "Daedalus is a Cataclysm extension and was formerly named Divine Phoenix and had one of the most extensive raiding and bot setups in the game.",
    ];
    const allianceWikis = [
      "https://politicsandwar.fandom.com/wiki/Rose",
      "https://politicsandwar.fandom.com/wiki/The_Knights_Radiant",
      "https://politicsandwar.fandom.com/wiki/The_Syndicate",
      "https://politicsandwar.fandom.com/wiki/The_Immortals",
      "https://politicsandwar.fandom.com/wiki/Cataclysm",
      "https://politicsandwar.fandom.com/wiki/The_Fighting_Pacifists",
      "https://politicsandwar.fandom.com/wiki/Eclipse",
      "https://politicsandwar.fandom.com/wiki/The_Commonwealth",
      "https://politicsandwar.fandom.com/wiki/Bourbon_Street",
      "https://politicsandwar.fandom.com/wiki/Grumpy_Old_Bastards",
      "https://politicsandwar.fandom.com/wiki/Guardian",
      "https://politicsandwar.fandom.com/wiki/Aurora",
      "https://politicsandwar.fandom.com/wiki/Carthago",
      "https://politicsandwar.fandom.com/wiki/Terminus_Est",
      "https://politicsandwar.fandom.com/wiki/Weebunism",
      "https://politicsandwar.fandom.com/wiki/The_Hand_of_Fate",
      "https://politicsandwar.fandom.com/wiki/The_Legion",
      "https://politicsandwar.fandom.com/wiki/The_Wei",
      "https://politicsandwar.fandom.com/wiki/Black_Knights",
      "https://politicsandwar.fandom.com/wiki/Soldiers_of_Liberty",
      "https://politicsandwar.fandom.com/wiki/Dark_Brotherhood",
      "https://politicsandwar.fandom.com/wiki/House_Stark_(2nd)",
      "https://politicsandwar.fandom.com/wiki/Waffle_House",
      "https://politicsandwar.fandom.com/wiki/Camelot",
      "https://politicsandwar.fandom.com/wiki/Name_Withheld",
      "https://politicsandwar.fandom.com/wiki/Order_of_the_White_Rose",
      "https://politicsandwar.fandom.com/wiki/The_Dead_Rabbits",
      "https://politicsandwar.fandom.com/wiki/United_Purple_Nations",
      "https://politicsandwar.fandom.com/wiki/The_Enterprise",
      "https://politicsandwar.fandom.com/wiki/The_Elites",
      "https://politicsandwar.fandom.com/wiki/Federated_States_of_Orbis_(Alliance)",
      "https://politicsandwar.fandom.com/wiki/Serpentis",
      "https://politicsandwar.fandom.com/wiki/The_Armed_Peacekeepers",
      "https://politicsandwar.fandom.com/wiki/Arrgh",
      "https://politicsandwar.fandom.com/wiki/Farkistan",
      "https://politicsandwar.fandom.com/wiki/Church_of_Atom",
      "https://politicsandwar.fandom.com/wiki/Global_Alliance_Treaty_Organization",
      "https://politicsandwar.fandom.com/wiki/Polaris",
      "https://politicsandwar.fandom.com/wiki/Hogwarts_(2nd)",
      "https://politicsandwar.fandom.com/wiki/Unforgiven_Legion",
      "https://politicsandwar.fandom.com/wiki/United_Socialist_Nations",
      "https://politicsandwar.fandom.com/wiki/Yarr",
      "https://politicsandwar.fandom.com/wiki/The_Federation",
      "https://politicsandwar.fandom.com/wiki/Union_of_Soviet_Socialist_Republics_(USSR)",
      "https://politicsandwar.fandom.com/wiki/Respublica_Romana",
      "https://politicsandwar.fandom.com/wiki/Genesis",
      "https://politicsandwar.fandom.com/wiki/Sanctuary",
      "https://politicsandwar.fandom.com/wiki/Morningstar",
      "https://politicsandwar.fandom.com/wiki/Oblivion_(2nd)",
      "https://politicsandwar.fandom.com/wiki/Eclipse",
      "https://politicsandwar.fandom.com/wiki/Weebunism",
      "https://politicsandwar.fandom.com/wiki/The_Mortals",
      "https://politicsandwar.fandom.com/wiki/Church_of_Atom",
      "https://politicsandwar.fandom.com/wiki/The_Fear",
      "https://politicsandwar.fandom.com/wiki/Solaris_directorate",
      "https://politicsandwar.fandom.com/wiki/Divine_Phoenix",
    ];
    const allianceHTML = {};
    for(var i = 0; i < allianceNames.length; i++){
        allianceHTML[allianceNames[i]] = `<div class="allianceDescriptionWrapper"><img src="${allianceFlags[i]}" class="flag"><br><p class="allianceDescription">${allianceDescriptions[i]} Learn more about the alliance <a href=${allianceWikis[i]}>here!</a></p></div>`
    }
    const answerContainers = quizContainer.querySelectorAll('.slider');
    let allianceSimilarities = {};
    myQuestions.forEach( (currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const userAnswer = answerContainer.value;
      for(var alliance in allianceAnswers){
        if(!(alliance in allianceSimilarities)){
          allianceSimilarities[alliance] = 0;
        }
        allianceSimilarities[alliance] += (allianceAnswers[alliance][questionNumber] - userAnswer)**2;
        if(questionNumber == myQuestions.length - 1){
          var distance = allianceSimilarities[alliance]**0.5;
          allianceSimilarities[alliance] = 100 - Math.round(distance / ((10000*myQuestions.length)**0.5) * 100);
        }
      }
    });
    var sortedSimilarities = Object.keys(allianceSimilarities).map(function(key){
      return [key, allianceSimilarities[key]];
    });
    sortedSimilarities.sort(function(first, second){
      return second[1] - first[1];
    });
    var sortedSimilaritiesReverse = sortedSimilarities.slice().reverse();
    resultsContainer.innerHTML = '<hr><div class="question">Your Top 5:</div>';
    for(var i = 0; i < 5; i++){
      resultsContainer.innerHTML += `<p>${i + 1}. <b>${sortedSimilarities[i][0]}</b>: ${sortedSimilarities[i][1]}% similarity</p>`
      resultsContainer.innerHTML += allianceHTML[sortedSimilarities[i][0]];
      if(i != 4){
        resultsContainer.innerHTML += '<p>&#9632;</p>'
      }
    }
    resultsContainer.innerHTML += '<hr><div class="question">Your Bottom 5:</div>';
    for(var i = 0; i < 5; i++){
      resultsContainer.innerHTML += `<p>${i + 1}. <b>${sortedSimilaritiesReverse[i][0]}</b>: ${sortedSimilaritiesReverse[i][1]}% similarity</p>`
      resultsContainer.innerHTML += allianceHTML[sortedSimilaritiesReverse[i][0]];
      if(i != 4){
        resultsContainer.innerHTML += '<p>&#9632;</p>'
      }
    }
    resultsContainer.innerHTML += '<hr>';
  }

  function showSlide(n) {
    if(n == -1){
      previousButton.style.display = 'none';
      nextButton.style.display = 'none';
      submitButton.style.display = 'none';
      return;
    }
    else{
        welcome.style.display = 'none';
    }
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showSlideInit() {
    var removeQuestionIndex = [];
    if(raidingCheckbox.checked){
        document.getElementsByClassName('slide' + raidQuestion)[0].remove();
        removeQuestionIndex.push(raidQuestion);
    }
    if(biasCheckbox.checked){
        for(var i of biasedQuestions){
            document.getElementsByClassName('slide' + i)[0].remove();
            removeQuestionIndex.push(i);
        }
    }
    slides = document.querySelectorAll(".slide");
    removeQuestionIndex.sort(function(first, second){
      return first - second;
    });
    for(var i = removeQuestionIndex.length - 1; i >= 0; i--){
        myQuestions.splice(removeQuestionIndex[i], 1);
    }
    showSlide(0);
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "What sized alliance do you prefer?",
      leftside: "Smol bois",
      rightside: "Big bois"
    },
    {
      question: "Do you prefer something old and established or new and fresh?",
      leftside: "Old",
      rightside: "New"
    },
    {
      question: "Is there a specific level of competency you prefer in an alliance?",
      leftside: "Nah, just here to chill",
      rightside: "Git gud or die trying"
    },
    {
      question: "Do you prefer an alliance that's more low or high profile/visibility?",
      leftside: "Low profile",
      rightside: "High profile"
    },
    {
      question: "How exclusive should the alliance be?",
      leftside: "Anyone can join",
      rightside: "Only a select few can join"
    },
    {
      question: "What crowd do you like to be around?",
      leftside: "Memes galore",
      rightside: "Periods and full sentences"
    },
    {
      question: "How do you prefer your technology (bots, sheets, etc)?",
      leftside: "Bots out",
      rightside: "Bots are love, bots are life"
    },
    {
      question: "Do you like to roleplay (your nation/alliance theme)?",
      leftside: "Ew, cringe",
      rightside: "*Nods aggressively*"
    },
    {
      question: "How active do you like your community?",
      leftside: "Peace and quiet",
      rightside: "Chat never dies"
    },
    {
      question: "Do you like communities that focus more on the game or outside of it?",
      leftside: "Out of game",
      rightside: "In game"
    },
    {
      question: "What's your stance on alliance or global war?",
      leftside: "Stand back and defend myself",
      rightside: "I'd like to help start them"
    },
    {
      question: "How active in the game politics do you want your alliance to be?",
      leftside: "Only defers to allies",
      rightside: "Game changer"
    },
    {
      question: "If you're a new player (C10 or below), how much do you raid? (Or how much did you when you were new?)",
      leftside: "War bad farm good",
      rightside: "Arrgh!"
    },
  ];
  const biasedQuestions = [2, 3, 10, 11];
  const raidQuestion = 12

  buildQuiz();
  const welcome = document.getElementById("welcome");
  const startButton = document.getElementById("start");
  const biasCheckbox = document.getElementById("bias");
  const raidingCheckbox = document.getElementById("raiding");
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  var slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  showSlide(-1);
  startButton.addEventListener('click', showSlideInit);
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  var slider = document.getElementsByClassName("slider");
  var outputLeft = document.getElementsByClassName("sliderValLeft");
  var outputRight = document.getElementsByClassName("sliderValRight");
  const correspondingOutput = {};
  for(var i = 0; i < outputLeft.length; i++){
    outputLeft[i].innerHTML = 100 - slider[i].value + "%";
    outputRight[i].innerHTML = slider[i].value + "%";
    correspondingOutput[slider[i].name] = [outputLeft[i], outputRight[i]]
    slider[i].oninput = function(){
      correspondingOutput[this.name][0].innerHTML = 100 - this.value + "%";
      correspondingOutput[this.name][1].innerHTML = this.value + "%";
    }
  }
})();
