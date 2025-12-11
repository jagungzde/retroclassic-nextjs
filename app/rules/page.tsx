"use client"

import LogoBanner from "@/app/components/logoBanner";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";


import styles from "./page.module.css";

export default function Download(){
    

    return (
        <div className="relative flex flex-col justify-start font-sans bg-[url(/images/home_main_bg.webp),_url(/images/home_header_bg.webp)] bg-[contain, contain] bg-position-[center_190px,top] sm:bg-position-[center_250px,top] md:bg-position-[center_250px,top] lg:bg-position-[center_250px,top] bg-size-[130%] lg:bg-auto bg-no-repeat bg-blend-normal ">
            <Header />
            <LogoBanner />
            <div className="my-20">
                <div className="w-[95%] max-w-[1200px] bg-[#222222] border-2 border-gray-500 shadow-2xl m-auto py-4 px-10">
                <main className="overflow-hidden relative">
        
          <div className={styles.rulecontainer}>
      <div className={styles.header}>
          <h1>RETRO PW CLASSIC - OFFICIAL RULES & REGULATIONS</h1>
          <h2>Policy & Enforcement Guidelines</h2>
      </div>
      <div className={styles.section}>
          <div className={styles['section-title']}>I. ACCOUNT SECURITY</div>
          <div className={styles['content-block']}>
              <p>We strongly urge all Retro PW Classic players to use unique passwords for every other game and all other platforms.</p>
              <p><strong>Never share your password with anyone.</strong></p>
              <p>Retro PW Classic will not be responsible for any item or account loss caused by player negligence.</p>
              <p>Retro PW Classic will never request your password for any reason.</p>
              <p>If anyone impersonates Retro PW Classic staff to ask for your password, immediately report them to Discord:</p>
          </div>
          <div className={styles['contact-box']}>
              <p>@RetroClassic Support</p>
              <p>@Community Manager</p>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>II. SERVER EXPLOITATION</div>
          <div className={styles['content-block']}>
              <p>Any form of server exploitation is strictly prohibited, including but not limited to:</p>
              <p>Illegal 3rd party programs / cheats (trainer, engine, etc.)</p>
              <p>Bug abuse</p>
              <p>Item duplication (dupe)</p>
              <p>Any action harming the server for personal or group benefit</p>
              <p>Submit reports to @Customer Service (24 hours) or @Community Manager with clear screenshot/video evidence.</p>
              <p>Reporter identity is fully confidential, and valid reports receive rewards.</p>
          </div>
          <div className={styles['sanction-box']}>
              <strong>Sanctions:</strong>
              <ol>
                  <li>3-day ban → Permanent HWID ban</li>
              </ol>
              <p>Severity may vary.</p>
          </div>
          <div className={styles['sanction-box']}>
              <p><strong>Special Case</strong></p>
              <p>Any player who discovers or uses any type of bug (including cheat/dupe) and does not report it will receive:</p>
              <p>Permanent Ban</p>
              <p>Item Confiscation (quest bug / item / currency / etc.)</p>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>III. RUMORS & DISRUPTION</div>
          <div className={styles['content-block']}>
              <p>Players may not create chaos, flame others, or spread harmful rumors on livestreams, ingame, or on Discord.</p>
              <p><strong>Examples include:</strong></p>
              <p>&quot;GM is injecting items&quot;</p>
              <p>&quot;Guild A is Retro PW Classic&apos;s favorite&quot;</p>
              <p>&quot;That gear is from backdoor&quot;</p>
              <p>&quot;The match is rigged for Guild A&quot;</p>
              <p>&quot;The server is shutting down soon&quot;</p>
          </div>
          <div className={styles['sanction-box']}>
              <strong>Sanctions:</strong>
              <ol>
                  <li>3-day ban → Permanent ban</li>
              </ol>
              <p>depending on severity.</p>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>IV. RESPECT TOWARD RETRO PW CLASSIC STAFF</div>
          <div className={styles['content-block']}>
              <p>Prohibited behaviors toward players, staff:</p>
              <p>Defamation</p>
              <p>Insults</p>
              <p>Degrading comments</p>
              <p>Slander</p>
              <p>Threats</p>
              <p>SARA or pornographic content</p>
              <p>Impersonating Owner/GM/CM</p>
              <p>Revealing staff&apos;s personal information (real name, ID, address, workplace, social status, photos)</p>
          </div>
          <div className={styles['sanction-box']}>
              <strong>Sanctions:</strong>
              <ol>
                  <li>6-hour ban → Permanent ban (ingame/Discord)</li>
              </ol>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>V. IGN / NAME / TITLE REGULATIONS</div>
          <div className={styles['content-block']}>
              <p>Prohibited:</p>
              <p>Vulgar, pornographic, SARA, or provocative IGNs/guild names</p>
              <p>Names resembling GM identity</p>
              <p>Offensive vending titles</p>
          </div>
          <div className={styles['sanction-box']}>
              <strong>Sanctions:</strong>
              <p>Nickname / guild name: changed without approval</p>
              <p>Vending title: 1-day ban → Permanent ban</p>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>VI. MACRO USAGE</div>
          <div className={styles['content-block']}>
              <p>Use of 3rd party macro programs for auto-hunt/farm is prohibited.</p>
              <p>GM Patrol has full authority to inspect suspicious characters.</p>
              <p>If a player fails to respond within 30 seconds, they are considered AFK using illegal tools.</p>
          </div>
          <div className={styles['sanction-box']}>
              <strong>Sanctions:</strong>
              <p>30-day ban → Permanent ban</p>
              <p>No appeals are accepted for any reason.</p>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>VII. LANGUAGE CONDUCT</div>
          <div className={styles['content-block']}>
              <p>Players may not use:</p>
              <p>SARA</p>
              <p>Personal/family insults</p>
              <p>Sexual harassment</p>
              <p>Offensive language in whispers, vending titles, or public channels</p>
          </div>
          <div className={styles['sanction-box']}>
              <strong>Sanctions:</strong>
              <ol>
                  <li>6-hour ban → Permanent ban</li>
              </ol>
              <p>Severity accumulates with violations.</p>
              <p>CM & GM decisions are final.</p>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>VIII. ACCOUNT SHARING</div>
          <div className={styles['content-block']}>
              <p>Sharing accounts for any reason is prohibited.</p>
              <p>Any resulting loss is not RETRO PW CLASSIC&apos;s responsibility.</p>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>IX. SCAM / FRAUD</div>
          <div className={styles['content-block']}>
              <p>Any form of scamming (RMT/Gold) is strictly prohibited.</p>
          </div>
          <div className={styles['sanction-box']}>
              <strong>Sanctions:</strong>
              <p>Permanent HWID ban</p>
              <p>Ban from all RETRO PW CLASSIC Discord servers</p>
              <p>Scammer&apos;s bank account added to blacklist channel</p>
          </div>
          <div className={styles['sanction-box']}>
              <p><strong>Special Case</strong></p>
              <p>If a player is scammed by someone impersonating a streamer or staff, and the IGN is misused for fraud:</p>
              <p>Scammer&apos;s IP + HWID permanently banned</p>
              <p>Sold character: permanently banned unless both parties settle and withdraw the report</p>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>X. IMPERSONATION</div>
          <div className={styles['content-block']}>
              <p>Impersonating another player (Cloning Abor) from scamming and spreading their identity is prohibited.</p>
          </div>
          <div className={styles['sanction-box']}>
              <strong>Sanction:</strong>
              <p>Permanent in game & Discord ban (no warning)</p>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>XI. MARKET RULES (INGAME)</div>
          <div className={styles['content-block']}>
              <p>Prohibited:</p>
              <p>Mentioning Real Money prices, left-rate, pension price, loss price, etc.</p>
              <p>Using selling/buying terms such as:</p>
              <p>&quot;cheap,&quot; &quot;pension,&quot; &quot;dorm price,&quot; &quot;urgent,&quot; &quot;SALE,&quot; &quot;warehouse clear,&quot;</p>
              <p>&quot;special price,&quot; &quot;best price,&quot; &quot;buying all,&quot; etc.</p>
              <p>Sell items without promotional wording.</p>
          </div>
          <div className={styles['sanction-box']}>
              <strong>Sanctions:</strong>
              <p>Warn 1: 1-day chat ban</p>
              <p>Warn 2: 7-day chat ban</p>
              <p>Warn 3: 30-day chat ban</p>
              <p>Warn 4: Permanent chat ban</p>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>XII. VENDING POLICY</div>
          <div className={styles['content-block']}>
              <p>Prohibited vending titles:</p>
              <p>SARA</p>
              <p>Parental insults</p>
              <p>Sexual harassment</p>
              <p>Referral promotion</p>
          </div>
          <div className={styles['sanction-box']}>
              <strong>Sanctions:</strong>
              <p>Warn 1: Warning</p>
              <p>Warn 2: Kick</p>
              <p>Warn 3: 6-hour ban</p>
              <p>Warn 4: 1-day ban</p>
              <p>Warn 5: 7-day ban</p>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>XIII. REFERRAL CODE RULES</div>
          <div className={styles['content-block']}>
              <p>Prohibited:</p>
              <p>Using vending / world chat / horn / megaphone to promote referral codes.</p>
          </div>
          <div className={styles['sanction-box']}>
              <strong>Sanctions:</strong>
              <p>Warn 1: Warning</p>
              <p>Warn 2: Referral disabled</p>
              <p>Warn 3: Referral disabled & deleted</p>
          </div>
          <div className={styles['sanction-box']}>
              <p><strong>Special Cases</strong></p>
              <p>Case 1:</p>
              <p>Inactive referral owners (streamer/guild) → referral disabled without notice.</p>
              <p>Case 2:</p>
              <p>Selling an ID containing a referral → referral removed.</p>
              <p>Case 3:</p>
              <p>Referral promotion cannot use cashback, raffle, bonus, marketing, etc.</p>
              <p>1st warn: Warning</p>
              <p>2nd warn: Referral removed</p>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>XIV. PROMOTING OTHER SERVERS</div>
          <div className={styles['content-block']}>
              <p>Prohibited:</p>
              <p>Mentioning or promoting other active PW servers</p>
              <p>Mentioning their owners (real name or old IGN)</p>
              <p>Using code words, translations, shortened versions, or links</p>
          </div>
          <div className={styles['sanction-box']}>
              <strong>Sanctions:</strong>
              <p>3-day ban → Permanent ban</p>
              <p>1-day timeout → Discord Permanent ban</p>
          </div>
      </div>

      <div className={styles.section}>
          <div className={styles['section-title']}>XV. INCITING QUITTING / PERSUASION TO RETIRE</div>
          <div className={styles['content-block']}>
              <p>Prohibited:</p>
              <p>Encouraging active players to quit the game (in the context of persuasion)</p>
              <p>Example:</p>
              <p>✘ &quot;Let&apos;s quit, the server is closing soon.&quot;</p>
              <p>Retro PW Classic does not accept appeals if the player is proven guilty.</p>
          </div>
          <div className={styles['sanction-box']}>
              <strong>Sanctions:</strong>
              <p>6-hour ban → Permanent ban</p>
              <p>Evidence (screenshot/video) required.</p>
          </div>
      </div>

  </div>
        
          
      </main>
                </div>
            </div>
            <Footer />
        </div>
    )
}