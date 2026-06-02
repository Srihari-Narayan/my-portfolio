export const writeups = [
    {
        slug: "prometheon-htb-ai-ml-challenge-walkthrough",
        title: "Prometheon — HTB AI/ML Challenge walkthrough",
        description: "A walkthrough of solving the Prometheon challenge on Hack The Box, focusing on adversarial machine learning.",
        date: "Apr 10, 2026",
        readTime: "5 min read",
        thumbnail: "",
        tags: ["htb", "ai-security", "walkthrough"],
        content: `## Content Coming Soon

The content for this walkthrough will be uploaded here soon.`
    },
    {
        slug: "how-i-failed-and-then-conquered-the-pt1-exam-by-tryhackme",
        title: "How I failed and then conquered the PT1 exam by TryHackMe",
        description: "An honest review and walkthrough of passing the TryHackMe PenTester Level 1 (PT1) certification exam.",
        date: "Mar 23, 2026",
        readTime: "6 min read",
        thumbnail: "/images/pt1.png",
        pdf: "/images/pt1_cert.pdf",
        tags: ["thm", "certs", "pentesting"],
        content: `## Introduction

Welcome back to another one of my legacy articles, where I talk about stuff which happened way back. This time, I want to talk about my experience with THM’s own PT1 exam.

The story begins at DEFCON 33, which in itself was a cool experience for me, and I will be sure to attend to DEFCON 34 later this year. I came across THM’s booth in the Blue Team Village, and talked to the people at the stall, and told them that I had been using the cybersecurity learning platform since April of 2024. They then told me that I could get the exam voucher (with a retry voucher, believe me this is important for later) for free! I had the option between PT1 and SAL1, and I chose PT1. I might go for SAL1 one day who knows.

I received the exam vouchers directly on my THM dashboard a few days after giving them my email, and planned on giving my exam on the 24th August, 2025 at around 11 AM. I had been preparing for the OSCP already so I felt confident.

## The first attempt

Same as last time, I researched on the exam format beforehand, and understood that there are 3 sections in total — Network pentest, one linux machine and one windows machine, Active Directory pentest, with two machines with one of them being the Domain Controller, and finally Web pentest, which included finding 4 bugs on a website. The Network section was going to be worth 36% of the overall grade, the active directory being 24%, and the web section being 40%.

There were 10 flags to be captured across these three domains, with the network section having 4 flags (2 in each machine, one local and one after gaining privileged access), active directory having 2 flags (one in each machine), and the web section having 4 flags, one of each valid bug or vulnerability. To top all of this off, after finding the flags, you had to write a report, containing the finding name, CVSS score, flag value, description of the attack, potential remediation, which would have then determined if you passed or not, based on a score from 0 to 1000, with passing being 750.

Long story short… I failed. It devastated me. I thought I was well prepared, I thought 48 hours would be more than enough. I simply underestimated the exam. I failed to capture 2 flags in the web section, and one flag in the Windows privileged user in the network section, and to make matters worse, I messed in the report section as well, losing out on a lot of points.

## Preparation

After the exam ended, I looked at my report analysis, and figured out what my weak spots were. For the web section, I practiced challenges with the help of PortSwigger Academy Labs to harden my OWASP top 10 concepts, which was something integral to this section. For the active directory and network section, I practiced Windows challenge boxes, giving special attention to privilege escalation techniques. I focused on refining my approach — how to prevent wasting time chasing rabbit holes, how to enumerate thoroughly, how to utilize searchsploit and exploit-db efficiently, and more.

One of my blunders in the first attempt was using THM’s AttackBox for the first 6 hours in the exam, as opposed to using my Kali VM which contained my tools, scripts and binaries, and not to mention the necessary dependencies. Another blunder of mine was poor note taking. I panicked so much that I wasn’t capturing any of the other flags that I forgot to write down the steps and commands for the ones which I did capture. This time, I was ready to conquer the exam — I organized everything on my Kali VM. I planned on giving it on 5th September 2025, this time starting at 4:00 PM so technically I had “three” days (Its still 48 hours, but by starting late in the day, I gave myself the impression of more time.)

## The second attempt

Once again, I’ll spare you the boring details… I overprepared for the second attempt and captured all of the flags in the first 6 hours. I genuinely laughed out loud after finding the final flag. Was this the same exam which was giving me nightmares after failing the first time? This attempt really put things into perspective for me. The exam wasn’t difficult technically, but rather I had simply not prepared or practiced for it enough before. I also had not taken it too seriously before.

It is strange to think something good came out of failure! I refined my methodology and approach so much, with actual proof to show for it.

After having this revelation, I relaxed, and then wrote the report the next day with a fresh mind, after documenting my approach for each flag thoroughly. I got my results and analysis saying that I passed, a couple of minutes after I hit submit on the report. With results and analysis being delivered so instantly, there was definitely an AI grading the report, which really shows how heavily adopted AI is in our world now.

When going through the results, I noticed that there was an issue with the flag submission for one of the flags in the web section, so I missed out on 40 points for that. The other aspects of the report for this particular vulnerability were correct however and I received full points for that. In my mind, I did capture all 10 flags.

![TryHackMe PT1 Scorecard](/images/pt1_scorecard.png)

## Conclusion

Ultimately, I was happy that I passed, that too with such speed. But other than me passing this exam, I learned a really valuable lesson. It is okay to fail sometimes, as long as you learn something useful out of it. My failure demonstrated a poor methodology and a lack of practice, which was an eye-opening experience for me. There was no such thing as too much practice, and you can always improve your skills. This entire experience was ingrained in my mind as I continued preparing for the OSCP exam.`
    },
    {
        slug: "juicy-thm-ai-challenge-box-walkthrough",
        title: "Juicy — THM AI Challenge Box Walkthrough",
        description: "A detailed walkthrough of the THM Juicy machine, focusing on prompt injection security vulnerabilities.",
        date: "Mar 9, 2026",
        readTime: "7 min read",
        thumbnail: "",
        tags: ["thm", "ai-security", "walkthrough"],
        content: `## Content Coming Soon

The content for this walkthrough will be uploaded here soon.`
    },
    {
        slug: "bitsctf-2026-osint-challenge-writeup-internet-rabbithole",
        title: "BITSCTF 2026 OSINT challenge writeup: Internet RabbitHole",
        description: "A step-by-step writeup of solving the BITSCTF 2026 OSINT challenge 'Internet RabbitHole'.",
        date: "Feb 24, 2026",
        readTime: "8 min read",
        thumbnail: "/images/bitsctf_2026/Picture1.png",
        tags: ["ctf", "osint", "walkthrough"],
        content: `![Picture 2](/images/bitsctf_2026/Picture2.png)

I participated in BITSCTF 2026 recently which was held 20th-22nd February 2026, under the team RandomHackers. Our team placed 110th place out of 863 teams. I am only going to talk about this one particular OSINT challenge, which was one of my favourite OSINT based CTF challenges which I have ever solved. But this challenge wasn’t without its hiccups, although now I am getting ahead of myself.

![Picture 3](/images/bitsctf_2026/Picture3.png)

Now based on the challenge description, I quickly deduced that I am looking for a Linkedin account for the user ‘Shirley Klaus’ from Berlin. On googling this name along with the word ‘linkedin’, I found a page which matched the description.

![Picture 4](/images/bitsctf_2026/Picture4.png)

[https://www.linkedin.com/in/shirley-klaus-3b76423a8/](https://www.linkedin.com/in/shirley-klaus-3b76423a8/)

I looked around and didn’t find anything interesting right away. She was working at a company named Mikhailson and Co. (which does not exist). I then looked at the description for her education and found a critical hint.

![Picture 5](/images/bitsctf_2026/Picture5.png)

Stars & stargazing, and Instagram. Hmmm… so naturally I searched for her Instagram using her name along with the keywords stars, stargazing etc, but didn’t find anything. I even tried reverse image searching her profile picture but found nothing (made me go crazy a bit not gonna lie). But then it hit me, her linkedin banner was a photo of the night sky (space and stars!). I downloaded the photo to perform a reverse image search. I don’t know what did I expect trying to reverse image search a generic photo of the night sky, but don’t blame me for trying. Obviously, I did not get any useful results, so I did the next beset thing and manually inspected the photo, and wouldn’t you know it, I found a small faint line of text hidden in the top right corner of the image: \`secret_life_of_shir456\`

![Picture 6](/images/bitsctf_2026/Picture6.png)

Armed with this username and the fact that I am supposed to look for an Instagram account, I immediately discovered an account with this username. The account only had one post about her pet cat.

![Picture 7](/images/bitsctf_2026/Picture7.png)

[https://www.instagram.com/secret_life_of_shir456/](https://www.instagram.com/secret_life_of_shir456/)

The results of the reverse image search on the photo of the cat weren’t so fruitful, as it turned out that it is a generic stock photo. I then turned my attention to the image caption, which stated that this user has a blog, and has a friend named \`l1l17h-hehe\`, which in my opinion are two really big hints.

![Picture 8](/images/bitsctf_2026/Picture8.png)

A simple google search for ‘Shirley blog posts’ revealed a vercel link which contained her daily blogs. Now, same as last time, I found not one but two critical hints. The red website clearly referred to Reddit, and the octocat referred to GitHub, and since the username for the reddit account was somewhere on this Github repo, I first searched for \`l1l17h-hehe\`’s Github account.

![Picture 9](/images/bitsctf_2026/Picture9.png)

[https://shirleys-blog-posts.vercel.app/](https://shirleys-blog-posts.vercel.app/)

This was also simple enough, as I found it using google once again. I tried going through all of the repos and checked past commits before realizing I didn’t even check the profile description, and there it was, the username ‘Quiet-Department7684’

![Picture 10](/images/bitsctf_2026/Picture10.png)

[https://github.com/L1L17H-hehe?tab=repositories](https://github.com/L1L17H-hehe?tab=repositories)

![Picture 11](/images/bitsctf_2026/Picture11.png)

I then found a reddit account with the same name and found one post mentioning a youtube link and a reply from the same user saying that the video gave her insight for somewhere else to spill her thoughts.

For me, this is where the rabbit hole truly began…

![Picture 12](/images/bitsctf_2026/Picture12.png)

[https://www.reddit.com/user/Quiet-Department7684/](https://www.reddit.com/user/Quiet-Department7684/)

The youtube video wasn’t related to anything, which confused me especially because there weren’t any comments from Shirley or anything related to the CTF in the comments for that matter (this is going to be important later).

![Picture 13](/images/bitsctf_2026/Picture13.png)

[https://www.youtube.com/watch?v=d8S5t__4hTA](https://www.youtube.com/watch?v=d8S5t__4hTA)

I should mention that I reached this part of the challenge within the first 30 minutes since the start of the CTF. I am making a point to specify this because the next part stole away 2 hours of my life I am never getting back.

After trying to check the ‘Best Gymnastics’ Youtube page as well as their Instagram page for clues, I made the leap in logic: Tumbling… Tumblr?! (believe it or not, I actually said this out loud). But it made sense — her saying that she was inspired to spill her thoughts on another platform.

Then to make matters worse, I stumbled across this account, which I am genuinely not sure was part of this rabbit hole to throw us off, or was made by one of the participants to troll the rest of us (I am certain the account was made after the competition started — a good 2 hours after it stated that too). It was so strange, all of the posts were made a few hours after the competition started.

![Picture 14](/images/bitsctf_2026/Picture14.png)

[https://www.tumblr.com/quiet-department7684](https://www.tumblr.com/quiet-department7684)

Naturally I raised a ticket on the official discord server asking if this was legit, and I didn’t receive any response for a while. It was around 3:30 in the morning when I gave up and went to sleep, and wouldn’t you know it, that is when they decided to get back to me! When I woke up, I noticed that they had replied to my ticket 3 hours ago, saying that they fixed the issue and that I should probably check the YouTube comments once again.

There it was. The critical hint.

![Picture 15](/images/bitsctf_2026/Picture15.png)

I also checked the YouTube channel for any additional clues, but found nothing. But that didn’t matter because I knew what I was looking for.

![Picture 16](/images/bitsctf_2026/Picture16.png)

Bingo!

![Picture 17](/images/bitsctf_2026/Picture17.png)

[https://www.tumblr.com/sh1rl3y123](https://www.tumblr.com/sh1rl3y123)

I browsed through the posts and found the flag!

![Picture 18](/images/bitsctf_2026/Picture18.png)

Flag: \`BITSCTF{w45n7_7h15_0n3_4nn0y1ng}\`

In the end, the challenge itself was really fun, and I didn’t find it annoying (the flag might think otherwise). What I did find annoying was the fact that there weren’t any clues on the YouTube video when I reached that point of the challenge initially — I mean I could’ve been the first person who solved this challenge if that was the case! But hey what matters most is the fact that I did indeed solve it, and enjoyed the process. Stay tuned for my next article.`
    },
    {
        slug: "how-i-passed-the-ejpt-exam-as-a-beginner",
        title: "How I passed the eJPT exam as a beginner",
        description: "Tips and resources for passing the eJPT (Junior Penetration Tester) exam as a cybersecurity beginner.",
        date: "Feb 17, 2026",
        readTime: "8 min read",
        thumbnail: "/images/ejpt_cert.jpg",
        pdf: "/images/ejpt_cert.pdf",
        tags: ["certs", "ejpt", "beginner"],
        content: `## Introduction

While I was preparing for the OSCP exam, my friend had told me about the eJPT Junior Penetration Tester Exam by INE Security. Seeing that this would be a great way to get my feet wet before diving into the proverbial swimming pool that is OSCP, I decided to purchase the 3 month study bundle and exam voucher titled ‘eJPT Fundamentals’. Another thing to note, the bundle was on sale when I bought it — summer sale I think, so be on the lookout for that if you’re interested in it.

![eJPT Badge](/images/ejpt_badge.png)

## Pre-Exam

Before I even started preparing for this exam, I researched online on the format of the exam: Fully hands-on, 48 hour practical exam, open book, open notes, open internet, immediate results and feedback; but no report writing.

While the videos and notes by the instructor Alexis Ahmed were really good and informative, the resource which genuinely helped me the most for preparing for this exam were the SkillCheck CTF challenges at the end of each module or sub-module. I highly recommend watching the lecture videos and then attempting the practice CTF challenge without looking up for any walkthroughs (there are plenty of them available in case you genuinely end up getting stuck).

## The exam experience

Forgive my memory, as I am recounting experiences from 6 or 7 months ago, but I am pretty sure I started my exam on 21st July 2025 around 6 PM and ended it the next day at 2 AM, taking around 8 or so hours. I should have started it in the morning, considering I had the freedom to start the exam at any time which I desired. Taking part in a bunch of real CTF competitions certainly helped my exam experience a lot. My goal wasn’t just to answer all of the questions correctly, but rather it was to capture all of the flags on all of the target machines; after all if you manage to get the flags, you can answer the MCQ questions correctly, as they act as a benchmark of sorts (and the implication is that you couldn’t answer the questions correctly unless you already got the flag the intended way).

Unlike the OSCP exam, you can use Metasploit on the eJPT as many times as you like! This means that you don’t have to spend time manually testing exploits.

My strategy for the exam was to pick a machine, and keep working on it until I hit a roadblock or captured the flag (or in some cases simply exploited the machine). Whenever I did hit a roadblock, I would take a break of 15 minutes and start working on a different machine, and then eventually circle back the machine I was stuck on. You would be surprised by the difference in efficiency between a well-rested mind and a burnt out one.

## Post-Exam

I gracefully passed the exam within 8 hours. I could’ve gotten a higher percentage than what I got, but honestly, I was just happy that I got all of the flags and grew a bit impatient. Parts where I messed up, or took for granted was port forwarding as I had never practised port forwarding ever before and figured I would do it on the fly during the exam which was a big mistake as I did not know how to troubleshoot efficiently when something went wrong. The main takeaway here is that you should always practise, and never take a topic for granted.

Also another takeaway was that I should schedule my exams earlier in the day when I have the energy, and this is a key takeaway which I have followed since then.

Finally, in a rush to finish the exam I didn’t cross verify some of the MCQ questions, as I was only focused on the practical implementation. I used notepad instead of Notion or Obsidian rather than keeping a solid documentation and taking proper notes (hey I was still a noob back then).

## Conclusion

Call me a nerd, but I had a lot of fun during this exam. Looking back, I can say that this is how my journey as an aspiring Penetration Tester began. From this exam, I learned that patience is key. If I had the chance to give the exam now, I would have implemented all of my methodologies which I had developed as part of my OSCP preparation, and utilized all that extra time after capturing the flags to verify the answers methodically (this time with patience). Ultimately, this certification was a great stepping stone to OSCP, and I would highly recommend this certification to anyone who is preparing for the OSCP exam.`
    },
    {
        slug: "my-experience-of-htbs-cyber-apocalypse-ctf-2025",
        title: "My experience of HTB’s Cyber Apocalypse CTF 2025",
        description: "Reflecting on the challenges, teamwork, and learning experiences from HTB's Cyber Apocalypse CTF 2025.",
        date: "Feb 16, 2026",
        readTime: "6 min read",
        thumbnail: "/images/cyber_apocalypse_2025.jpg",
        tags: ["htb", "ctf", "experience"],
        content: `For the third CTF, me and my team took part in HTB’s Cyber Apocalypse CTF 2025: Tales from Eldoria. While there were a lot of categories of challenges, I focused on a wide array of challenges such as Web, Reverse Engineering, OSINT and my favourite, Prompt injection. Our rank was 1515 out of 8130 teams, and the competition lasted for 5 days, starting on March 21st 2025 and ending on March 26th 2025. Let’s not waste any time and dive into the challenges!

## Web

Being the most comfortable with web security and web based challenges, it was a no brainer that I start with this category first.

1. Trial by fire: This was a simple Server Side Template Injection challenge. I got the flag using this simple payload:

\`\`\`jinja2
{{ url_for.__globals__.os.popen('cat flag.txt').read() }}
\`\`\`

2. Whispers of the moonbeam: This was an input field which was vulnerable to command injection, so naturally I appended a command to read the contents of the flag.txt file to a legitimate use case command:

\`\`\`bash
examine | cat flag.txt
\`\`\`

## OSINT

This was my introduction to OSINT (Open Source Intelligence) based challenges. I didn’t even think that CTF challenges could be like this!

1. Echoes in Stone: It was a simple reverse image search

2. The Stone that wispers: It was a simple reverse image search in combination with looking up the wikipedia page.

3. The Ancient Citadel: It was again a simple reverse image search, along with looking up facebook as well as Wikipedia.

## Reverse Engineering

After being familiar with reverse engineering because of the past few CTFs, I decided to attempt one challenge in this domain again.

1. SealedRune: I decompiled the binary using DogBolt Decompiler, and then found a b64 string. I then decoded it which revealed the value of the flag in reverse. I then reversed it to get the flag.

## AI Prompt Injection

My absolute favourite type of CTF challenge as this involves manipulating the AI into giving you the flag. This essentially boils down to how well you can craft a lie along with crafting case specific payloads.

1. Cursed GateKeeper: I told the AI Chatbot that I was the evil leader Malakar (the big bad boss), and the it immediately gave me the real flag.

All in all, I solved a total of 7 challenges in total in the given timeframe. My teammates focused on other categories such as Forensics, binary exploitation and cryptography. I would say that this was a good introduction to OSINT.

However this CTF made me realise something — While it’s true that dabbling in CTFs can give you *some* level of hands-on practical experience (at least with security tools), I needed to study up and earn industry recognized certifications if I wanted to build my profile even more. After researching, I decided to prepare for eJPT from INE Security, and then OSCP from OffSec soon after.`
    },
    {
        slug: "my-second-ctf-picoctf-2025",
        title: "My second CTF: picoCTF 2025",
        description: "Sharing the lessons, scores, and writeups from competing in picoCTF 2025.",
        date: "Jan 14, 2026",
        readTime: "5 min read",
        thumbnail: "/images/picoctf_2025.png",
        tags: ["ctf", "picoctf", "experience"],
        content: `I know that I am a bit late to this writeup, but I have been busy with a lot of things, some of which you’ll hear about in detail soon, including but not limited to me earning my OSCP certification. Anyways, moving onto the actual writeup.

In March of 2025, I took part in a CTF competition — PicoCTF 2025, hosted by Carnegie Mellon University. My team and I ranked 435th out of 10460 teams with an overall score of 4410, with my personal contribution of 1275 points. I have to say, this is a massive improvement since my previous CTF competition attempt. Unlike the previous competition, this particular CTF lasted for 10 days! — starting on 7th March 2025, at 12:00 PM EST, and ending on 17th March 2025, at 3:00 PM EST. I completed 8 challenges ranging from easy to medium in difficulty across three domains — web exploitation, reverse engineering and even forensics.

For the sake of saving time, for each of the challenges which I finished, I will directly go into my approaches which succeeded, as opposed to walking you through the trial-and-error process.

Web Exploitation: One of my favourite domains in cybersecurity is web exploitation and protection, so naturally I gravitated towards this section in the competition before anything else.

1. SSTI1: After trial-and-error of trying to identify the server side template used in this vulnerable webapp, I quickly found out that it was using Jinja2 through the payload {{7*’7’}}. I managed to get the flag using an appropriate SSTI payload:

\`\`\`jinja2
{% if request['application']['__globals__']['__builtins__']['__import__']('os')['popen']('cat flag.txt')['read']() == 'chiv' %} a {% endif %}
\`\`\`

2. n0s4n1ty 1: I was able to upload a webshell, and then simply executed ‘cat flag.txt’

3. 3v@l: The webapp was running the vulnerable Python eval() function, which I exploited to get the flag.

4. Pachinko: This was kinda tough (for me at least), but after analysing the source code, I figured the output should be 1010, and surprisingly it worked.

Reverse Engineering: Two of our team members were already focusing on Web Exploitation, so I thought about attempting Reverse Engineering, as no one else seemed to be working on it.

1. Flag Hunters: The source code revealed that if I entered ‘RETURN 0’ as an input, it would print the flag… so I did.

2. Tap into Hash: I simply made a descrambler function based on the source code.

3. Quantum Scrambler: This was a fun one! I decoded the hex string, and removed the duplicates manually, to reveal the value of the flag.

Forensics: Feeling burnt out after failing to solve more web based and reverse engineering challenges, I decided to dabble in Forensics. I was familiar with tools like exiftool, steghide, and aperi’solve, so I decided to take on one of the easier challenges.

1. RED: I used Aperi’solve to extract a base64 encoded text, which upon being decoded revealed the flag.

I even attempted some binary exploitation challenges, and even managed to make progress, but unfortunately could not get the flag.

This was a much bigger CTF competition than my previous endeavour with a lot more variety in terms of domains with varying difficulties as well.

Overall, this particular CTF made me realise that I have a knack for reverse engineering, more than I expected at least, and I really liked attempting the challenges in this section.`
    },
    {
        slug: "my-first-ctf-winja-ctf-nullcon-goa-2025",
        title: "My First CTF (Winja CTF | Nullcon Goa 2025)",
        description: "The story of how I competed in my very first CTF competition during Nullcon Goa 2025.",
        date: "Mar 11, 2025",
        readTime: "5 min read",
        thumbnail: "",
        tags: ["ctf", "winja", "experience"],
        content: `Hello everyone, I recently took part in a ‘Capture The Flag’ (CTF) competition Winja CTF | Nullcon Goa 2025, along with my friend. This was my first competitive CTF, and I wanted to share my experiences of the same. The CTF was based in India, and took place on 2nd March 2025 from 11:30 AM IST to 4:30 PM IST.

Even though I am passionate about the domain of Cyber Security, I was understandably nervous, as I had not done this on a competitive level before and had only done CTF challenges on TryHackMe. Ultimately, our team OldD@ys ranked 49th among 170 teams, with a total score of 340 points, out of which I was responsible for securing 300.

The first challenge I tried to do was based on Large Language Model (LLM), wherein we were supposed to get the chatbot to say a particular phrase “Accio Flag”. The model was trained not to say the particular phrase, which meant that the only way to get it to say the phrase was through Prompt Injection. The model had the capabilities to analyse code and predict the output, so naturally, I wrote a line of python code simply asking it to perform a print statement, with the phrase as the string. The chatbot did not say the phrase, and told me it was not allowed to do so. So, I upped my approach, and asked it to perform string addition, and print the output, with the first string being the first word, and the second string being the second word. This bypassed the model’s adherence to its rules and I was successfully able to perform prompt injection, and was rewarded with the flag, and 100 points for doing so.

The second challenge was another LLM, but more advanced than the previous model. I tried the approaches I used in the previous challenge, knowing that it would fail, but I was curious to see how the model would react. I quickly realised it will be trickier to outsmart it this time around. This was a trial-and-error approach after all so I kept at it. Then it hit me, what if I simply encoded the phrase in Base64 using CyberChef and asked the model to decode it? I thought it was foolproof, but sadly it did not work. Then I thought of sending encoded versions of both words separately. So, using the help of CyberChef, I encoded the words ‘Accio’ and ‘Flag’ separately using Base64, and wrote a line in python asking it to decode the encoded strings and perform string addition. My approach finally succeeded, and I retrieved the flag, again being rewarded with 100 points.

These couple of challenges were fun, but got me thinking — nowadays we rely a lot on Artificial Intelligence chatbots for help, and how prompt injection with appropriate prompt engineering is an emerging threat. I commend the organisers of the CTF for their inclusion of these AI prompt injection challenges to shed light on its importance.

The next challenge I attempted was based on Web Application Security. I tried inspecting the source code, attempting Cross-site scripting (XSS) and testing for SQL injection, but could not find anything. Looking back, this was a relatively simple challenge, as all I had to do was perform a gobuster directory scan on the website, to reveal a directory /flag which contained… well, the flag! I was once again rewarded with 100 points.

There were other challenges I attempted, other than these three, but unfortunately, I could not complete them in time. Even though this was my first competitive CTF challenge, it certainly will not be my last. My performance in the competition was better than I expected, and the experience made me sign up for upcoming CTF competitions. This was a huge learning experience for me not only in terms of applying whatever I have learned till now, but also as an opportunity to work on my shortcomings. In my opinion, curiosity and determination are extremely important factors in order to take part in CTFs, more so than knowledge and experience — you will fail, but you need to be able to get back up and keep trying over and over, until you succeed.`
    }
];
