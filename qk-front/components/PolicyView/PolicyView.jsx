import Image from "next/image"

import qkLogo from "../../assets/images/qk-logo-text-blue.svg"
import Text from "../UI/Text/Text"
import styles from "./PolicyView.module.scss"

const PolicyView = () => {
   return (
      <div className={styles.wrapper}>
         <div className={styles.top}>
            <Image alt="Qualkey" height={110} src={qkLogo}
                   width={157}/>
         </div>
         <div className={styles.intro}>
            <Text medium>This privacy policy applies between you, the User of this Website, and QualKey Ltd., the owner
               and
               provider of this Website. QualKey Ltd. takes the privacy of your information very seriously. This privacy
               policy applies to our use of any and all Data collected by us or provided by you in relation to your use
               of
               the Website.
            </Text>
            <Text medium>This privacy policy should be read alongside, and in addition to, our Terms and Conditions,
               which can
               be found at: https://www.qualkey.org.</Text>
            <Text medium>Please read this privacy policy carefully.</Text>
         </div>
         <div className={styles.topBlock}>
            <Text big bold>Definitions and interpretation</Text>
            <Text medium>1. In this privacy policy, the following definitions are used:</Text>
            <div>
               <div className={styles.vocabItem}>
                  <Text bold medium>Data</Text>
                  <Text medium>Collectively all information that you submit to QualKey Ltd. via the Website.
                     This definition incorporates, where applicable, the definitions provided in the
                     Data Protection Laws;</Text>
               </div>
               <div className={styles.vocabItem}>
                  <Text bold medium>Cookies</Text>
                  <Text medium>A small text file placed on your computer by this Website when you visit certain
                     parts of the Website and/or when you use certain features of the Website.
                     Details of the cookies used by this Website are set out in the clause below
                     (Cookies);</Text>
               </div>
               <div className={styles.vocabItem}>
                  <Text bold medium>Data Protection Laws</Text>
                  <Text medium>Any applicable law relating to the processing of personal Data, including but not
                     limited to the GDPR, and any national implementing and supplementary laws,
                     regulations and secondary legislation;</Text>
               </div>
               <div className={styles.vocabItem}>
                  <Text bold medium>GDPR</Text>
                  <Text medium>The EU General Data Protection Regulation; UK Data Protection Act 2018</Text>
               </div>
               <div className={styles.vocabItem}>
                  <Text bold medium>Qualkey Ltd., we or us</Text>
                  <Text medium>QualKey Ltd., a company incorporated in England and Wales with registered
                     number 13585541 whose registered office is at 167-169, Great Portland Street,
                     5th Floor, London, W1W 5PF;</Text>
               </div>
               <div className={styles.vocabItem}>
                  <Text bold medium>UK and EU Cookie Law</Text>
                  <Text medium>The Privacy and Electronic Communications (EC Directive) Regulations 2003 as
                     amended by the Privacy and Electronic Communications (EC Directive)
                     (Amendment) Regulations 2011 &amp; the Privacy and Electronic Communications
                     (EC Directive) (Amendment) Regulations 2018;</Text>
               </div>
               <div className={styles.vocabItem}>
                  <Text bold medium>User or you</Text>
                  <Text medium>Any third party that accesses the Website and is not either (i) employed
                     by QualKey Ltd. and acting in the course of their employment or (ii) engaged as
                     a consultant or otherwise providing services to QualKey Ltd. and accessing the
                     Website in connection with the provision of such services; and</Text>
               </div>
               <div className={styles.vocabItem}>
                  <Text bold medium>Website</Text>
                  <Text medium>The website that you are currently using, https://www.qualkey.org, and any
                     sub-domains of this site unless expressly excluded by their own terms and
                     conditions.</Text>
               </div>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Scope of this privacy policy</Text>
            <div className={styles.blockItem}>
               <Text medium>3. This privacy policy applies only to the actions of QualKey Ltd. and Users with respect to
                  this Website. It does not extend to any websites that can be accessed from this Website including, but
                  not limited to, any links we may provide to social media websites.
               </Text>
               <Text medium>4. For purposes of the applicable Data Protection Laws, QualKey Ltd. is the “data
                  controller”. This means that QualKey Ltd. determines the purposes for which, and the manner in which,
                  your Data is
                  processed.</Text>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Data collected</Text>
            <div className={styles.blockItem}>
               <Text medium>5. We may collect the following Data, which includes personal Data, from you:
               </Text>
               <div className={styles.subBlockItem}>
                  <Text medium>a. name;</Text>
                  <Text medium>b. contact Information such as email addresses and telephone numbers;</Text>
                  <Text medium>c. financial information such as credit / debit card numbers;</Text>
                  <Text medium>d. IP address (automatically collected);</Text>
                  <Text medium>e. web browser type and version (automatically collected);</Text>
                  <Text medium>f. operating system (automatically collected);</Text>
                  <Text medium>g. a list of URLs starting with a referring site, your activity on this Website, and the
                     site you exit to
                     (automatically collected);</Text>
                  <Text medium>h. Shipping and billing addresses;
                     in each case, in accordance with this privacy policy.</Text>
               </div>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>How we collect Data</Text>
            <div className={styles.blockItem}>
               <Text medium>6. We collect Data in the following ways:
               </Text>
               <div className={styles.subBlockItem}>
                  <Text medium>a. data is given to us by you; and</Text>
                  <Text medium>b. data is collected automatically.</Text>
               </div>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Data that is given to us by you</Text>
            <div className={styles.blockItem}>
               <Text medium>7. QualKey Ltd. will collect your Data in a number of ways, for example:
               </Text>
               <div className={styles.subBlockItem}>
                  <Text medium>a. when you contact us through the Website, by telephone, post, e-mail or through any
                     other
                     means;</Text>
                  <Text medium>b. when you register with us and set up an account to receive our products/services;
                  </Text>
                  <Text medium>c. When you issue an order for our products/services;
                  </Text>
                  <Text medium>d. when you enter a competition or promotion through a social media channel;
                  </Text>
                  <Text medium>e. when you make payments to us, through this Website or otherwise;
                  </Text>
                  <Text medium>f. when you elect to receive marketing communications from us;
                  </Text>
                  <Text medium>g. when you use our services;
                  </Text>
                  <Text medium>in each case, in accordance with this privacy policy.</Text>
               </div>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Data that is collected automatically</Text>
            <div className={styles.blockItem}>
               <Text medium>8. To the extent that you access the Website, we will collect your Data automatically, for
                  example:
               </Text>
               <div className={styles.subBlockItem}>
                  <Text medium>a. we automatically collect some information about your
                     visit to the Website. This information
                     helps us to make improvements to Website content and navigation, and includes your IP
                     address, the date, times and frequency with which you access the Website and the way you use
                     and interact with its content.
                  </Text>
                  <Text medium>b. we will collect your Data automatically via cookies, in line with the cookie settings
                     on your
                     browser. For more information about cookies, and how we use them on the Website, see the
                     section below, headed “Cookies”</Text>
               </div>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Our use of Data</Text>
            <div className={styles.blockItem}>
               <Text medium>9. Any or all of the above Data may be required by us from time to time in order to provide
                  you with
                  the best possible service and experience when using our Website. Specifically, Data may be used by
                  us for the following reasons:
               </Text>
               <div className={styles.subBlockItem}>
                  <Text medium>a. internal record keeping;</Text>
                  <Text medium>b. improvement of our products / services;
                  </Text>
                  <Text medium>c. transmission by email of marketing materials that may be of interest to you only if
                     you signed
                     up to our newsletter;
                  </Text>
                  <Text medium>in each case, in accordance with this privacy policy.</Text>
               </div>
               <Text medium style={{ marginTop: "1.5rem" }}>10. We may use your Data for the above purposes if we deem it
                  necessary to do so for our
                  legitimate
                  interests. If you are not satisfied with this, you have the right to object in certain circumstances
                  (see
                  the section headed &quot;Your rights&quot; below).
               </Text>
               <Text medium>11. For the delivery of direct marketing to you via e-mail, we&#39;ll need your consent,
                  whether via an
               </Text>
               <div className={styles.subBlockItem}>
                  <Text medium>a. soft opt-in consent is a specific type of consent which applies when you have
                     previously
                     engaged with us (for example, you contact us to ask us for more details about a particular
                     product/service, and we are marketing similar products/services). Under”soft opt-in”consent,
                     we will take your consent as given unless you opt-out.
                  </Text>
                  <Text medium>b. for other types of e-marketing, we are required to obtain your explicit consent; that
                     is, you
                     need to take positive and affirmative action when consenting by, for example, checking a tick
                     box that we’ll provide.
                  </Text>
                  <Text medium>c. if you are not satisfied with our approach to marketing, you have the right to
                     withdraw consent
                     at any time. To find out how to withdraw your consent, see the section headed “Your Rights” below
                  </Text>
               </div>
               <Text medium style={{ marginTop: "1.5rem" }}>12. When you register with us and set up an account to receive
                  our services, the legal basis for this
                  processing is the performance of a contract between you and us and/or taking steps, at your
                  request, to enter into such a contract.
               </Text>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Who we share Data with</Text>
            <div className={styles.blockItem}>
               <Text medium>13. We may share your Data with the following groups of people for the following reasons:
               </Text>
               <div className={styles.subBlockItem}>
                  <Text medium>a. our employees, agents and/or professional advisors - to process orders and provide
                     customer
                     support;
                  </Text>
                  <Text medium>b. third party service providers who provide services to us which require the processing
                     of
                     personal data - to process shipping orders;
                  </Text>
                  <Text medium>c. third party payment providers who process payments made over the Website - to enable
                     third
                     party payment providers to process user payments and refunds;
                  </Text>
                  <Text medium>d. relevant authorities - to comply with regulations and official requests from
                     authorities;
                     in each case, in accordance with this privacy policy.
                  </Text>
               </div>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Keeping Data secure</Text>
            <div className={styles.blockItem}>
               <Text medium>14. We will use technical and organisational measures to safeguard your Data, for example:
               </Text>
               <div className={styles.subBlockItem}>
                  <Text medium>a. access to your account is controlled by a password and a user name that is unique to
                     you.
                  </Text>
                  <Text medium>b. we store your Data on secure servers.
                  </Text>
                  <Text medium>c. payment details are encrypted using SSL technology (typically you will see a lock icon
                     or green
                     address bar (or both) in your browser when we use this technology.
                  </Text>
               </div>
               <Text medium style={{ marginTop: "1.5rem" }}>15. Technical and organisational measures include measures to
                  deal with any suspected data
                  breach.
                  If you suspect any misuse or loss or unauthorised access to your Data, please let us know
                  immediately by contacting us via this e-mail address: info@changingattire.co.uk.
               </Text>
               <Text medium>16. If you want detailed information from Get Safe Online on how to protect your information
                  and
                  your computers and devices against fraud, identity theft, viruses and many other online problems,
                  please visit www.getsafeonline.org. Get Safe Online is supported by HM Government and leading
                  businesses.
               </Text>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Data retention</Text>
            <div className={styles.blockItem}>
               <Text medium>17. Unless a longer retention period is required or permitted by law, we will only hold your
                  Data on
                  our systems for the period necessary to fulfil the purposes outlined in this privacy policy or until
                  you
                  request that the Data be deleted.
               </Text>
               <Text medium>18. Even if we delete your Data, it may persist on backup or archival media for legal, tax
                  or
                  regulatory purposes.</Text>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Your rights</Text>
            <div className={styles.blockItem}>
               <Text medium>19. You have the following rights in relation to your Data:
               </Text>
               <div className={styles.subBlockItem}>
                  <Text medium>a. Right to access - the right to request (i) copies of the information we hold about you
                     at any
                     time, or (ii) that we modify, update or delete such information. If we provide you with access to
                     the information we hold about you, we will not charge you for this, unless your request is
                     &quot;manifestly unfounded or excessive.&quot; Where we are legally permitted to do so, we may
                     refuse
                     your request. If we refuse your request, we will tell you the reasons why.
                  </Text>
                  <Text medium>b. Right to correct - the right to have your Data rectified if it is inaccurate or
                     incomplete.

                  </Text>
                  <Text medium>c. Right to erase - the right to request that we delete or remove your Data from our
                     systems.
                  </Text>
                  <Text medium>d. Right to restrict our use of your Data - the right to &quot;block&quot; us from using
                     your Data or limit the
                     way in which we can use it.
                  </Text>
                  <Text medium>ce. Right to data portability - the right to request that we move, copy or transfer your
                     Data.
                  </Text>
                  <Text medium>f. Right to object - the right to object to our use of your Data including where we use
                     it for our
                     legitimate interests.
                  </Text>
               </div>
               <Text medium style={{ marginTop: "1.5rem" }}>20. To make enquiries, exercise any of your rights set out
                  above, or withdraw your consent to the
                  processing of your Data (where consent is our legal basis for processing your Data), please contact
                  us via this e-mail address: hans.winkler@changingattire.co.uk.
               </Text>
               <Text medium>21. If you are not satisfied with the way a complaint you make in relation to your Data is
                  handled by
                  us, you may be able to refer your complaint to the relevant data protection authority. For the UK,
                  this is the Information Commissioner&#39;s Office (ICO). The ICO&#39;s contact details can be found on
                  their
                  website at https://ico.org.uk/.
               </Text>
               <Text medium>22. It is important that the Data we hold about you is accurate and current. Please keep us
                  informed
                  if your Data changes during the period for which we hold it.
               </Text>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Transfers outside the United Kingdom and European Economic Area</Text>
            <div className={styles.blockItem}>
               <Text medium>23. Data which we collect from you may be stored and processed in and transferred to
                  countries
                  outside of the UK and European Economic Area (EEA). For example, this could occur if our servers
                  are located in a country outside the UK or EEA or one of our service providers is situated in a
                  country
                  outside the UK or EEA.
               </Text>
               <Text medium>24. We will only transfer Data outside the UK or EEA where it is compliant with data
                  protection
                  legislation and the means of transfer provides adequate safeguards in relation to your data, eg by
                  way of data transfer agreement, incorporating the current standard contractual clauses adopted by
                  the European Commission.
               </Text>
               <Text medium>25. To ensure that your Data receives an adequate level of protection, we have put in place
                  appropriate safeguards and procedures with the third parties we share your Data with. This ensures
                  your Data is treated by those third parties in a way that is consistent with the Data Protection Laws.
               </Text>
            </div>
         </div>
         <div className={styles.topBlock}>
            <Text big bold>Links to other websites</Text>
            <Text medium>26. This Website may, from time to time, provide links to other websites. We have no control
               over
               such websites and are not responsible for the content of these websites. This privacy policy does not
               extend to your use of such websites. You are advised to read the privacy policy or statement of
               other websites prior to using them.</Text>
            <div>
               <div className={styles.vocabItem}>
                  <Text bold medium>Data</Text>
                  <Text medium>Collectively all information that you submit to QualKey Ltd. via the Website.
                     This definition incorporates, where applicable, the definitions provided in the
                     Data Protection Laws;</Text>
               </div>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Changes of business ownership and control</Text>
            <div className={styles.blockItem}>
               <Text medium>27. QualKey Ltd. may, from time to time, expand or reduce our business and this may involve
                  the
                  sale and/or the transfer of control of all or part of QualKey Ltd.. Data provided by Users will, where
                  it
                  is relevant to any part of our business so transferred, be transferred along with that part and the
                  new owner or newly controlling party will, under the terms of this privacy policy, be permitted to
                  use the Data for the purposes for which it was originally supplied to us.
               </Text>
               <Text medium>28. We may also disclose Data to a prospective purchaser of our business or any part of it.
               </Text>
               <Text medium>29. In the above instances, we will take steps with the aim of ensuring your privacy is
                  protected.
               </Text>
            </div>
         </div>
         <div className={styles.topBlock}>
            <Text big bold>Cookies</Text>
            <Text medium>30. This Website may place and access certain Cookies on your computer. QualKey Ltd. uses
               Cookies
               to improve your experience of using the Website and to improve our range of products. QualKey
               Ltd. has carefully chosen these Cookies and has taken steps to ensure that your privacy is protected
               and respected at all times.
            </Text>
            <Text medium>31. All Cookies used by this Website are used in accordance with current UK and EU Cookie Law.
            </Text>
            <Text medium>32. Before the Website places Cookies on your computer, you will be presented with a message
               bar
               requesting your consent to set those Cookies. By giving your consent to the placing of Cookies, you
               are enabling QualKey Ltd. to provide a better experience and service to you. You may, if you wish,
               deny consent to the placing of Cookies; however certain features of the Website may not function
               fully or as intended.
            </Text>
            <Text medium>33. This Website may place the following Cookies:
            </Text>
            <div>
               <div className={styles.vocabItem}>
                  <Text bold medium>Strictly necessary cookies</Text>
                  <Text medium>These are cookies that are required for the operation of our website.
                     They include, for example, cookies that enable you to log into secure
                     areas of our website, use a shopping cart or make use of e-billing
                     services.</Text>
               </div>
               <div className={styles.vocabItem}>
                  <Text bold medium>Analytical/performance
                     cookies</Text>
                  <Text medium>They allow us to recognise and count the number of visitors and to see
                     how visitors move around our website when they are using it. This
                     helps us to improve the way our website works, for example, by
                     ensuring that users are finding what they are looking for easily.</Text>
               </div>
               <div className={styles.vocabItem}>
                  <Text bold medium>Functionality cookies</Text>
                  <Text medium>These are used to recognize you when you return to our website. This
                     enables us to personalise our content for you, greet you by name and
                     remember your preferences 9for example, your choice of language or
                     region). By using the Website, you agree to our placement of
                     functionality cookie.</Text>
               </div>
               <div className={styles.vocabItem}>
                  <Text bold medium>Targeting cookies</Text>
                  <Text medium>These cookies record your visit to our website, the pages you have
                     visited and the links you have followed. We will use this information to
                     make our website and the advertising displayed on it more relevant to
                     your interests. We may also share this information with third parties for
                     this purpose.</Text>
               </div>
               <Text medium>34. You can find a list of Cookies that we use in the Cookies Schedule.
               </Text>
               <Text medium style={{ marginTop: "1.5rem" }}>35. You can choose to enable or disable Cookies in your
                  internet browser. By default, most internet
                  browsers accept Cookies but this can be changed. For further details, please consult the help menu
                  in your internet browser.
               </Text>
               <Text medium style={{ marginTop: "1.5rem" }}>36. You can choose to delete Cookies at any time; however, you
                  may lose any information that
                  enables you to access the Website more quickly and efficiently including, but not limited to,
                  personalisation settings.
               </Text>
               <Text medium style={{ marginTop: "1.5rem" }}>37. It is recommended that you ensure that your internet
                  browser is up-to-date and that you consult
                  the help and guidance provided by the developer of your internet browser if you are unsure about
                  adjusting your privacy settings.
               </Text>
               <Text medium style={{ marginTop: "1.5rem" }}>38. For more information generally on cookies, including how
                  to disable them, please refer to
                  aboutcookies.org. You will also find details on how to delete cookies from your computer.
               </Text>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>General</Text>
            <div className={styles.blockItem}>
               <Text medium>39. You may not transfer any of your rights under this privacy policy to any other person.
                  We may
                  transfer our rights under this privacy policy where we reasonably believe your rights will not be
                  affected.
               </Text>
               <Text medium>40. If any court or competent authority finds that any provision of this privacy policy (or
                  part of any
                  provision) is invalid, illegal or unenforceable, that provision or part-provision will, to the extent
                  required, be deemed to be deleted, and the validity and enforceability of the other provisions of this
                  privacy policy will not be affected.
               </Text>
               <Text medium>41. Unless otherwise agreed, no delay, act or omission by a party in exercising any right or
                  remedy
                  will be deemed a waiver of that, or any other, right or remedy.
               </Text>
               <Text medium>42. This Agreement will be governed by and interpreted according to the law of England and
                  Wales.
                  All disputes arising under the Agreement will be subject to the exclusive jurisdiction of the English
                  and Welsh courts.
               </Text>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Changes to this privacy policy</Text>
            <div className={styles.blockItem}>
               <Text medium>43. QualKey Ltd. reserves the right to change this privacy policy as we may deem necessary
                  from
                  time to time or as may be required by law. Any changes will be immediately posted on the Website
                  and you are deemed to have accepted the terms of the privacy policy on your first use of the
                  Website following the alterations. You may contact QualKey Ltd. by email
                  at info@changingattire.co.uk.
               </Text>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Attribution</Text>
            <div className={styles.blockItem}>
               <Text medium>44. This privacy policy was created using a document from Rocket Lawyer
                  (https://www.rocketlawyer.com/gb/en). 22 September 2021
               </Text>
            </div>
         </div>
         <div className={styles.block}>
            <Text bold large>Cookies</Text>
            <div className={styles.blockItem}>
               <Text medium>Below is a list of the cookies that we use. We have tried to ensure this is complete and up to date, but if
                  you think that we have missed a cookie or there is any discrepancy, please let us know.
               </Text>
            </div>
         </div>
         <div className={styles.topBlock}>
            <Text big bold>Strictly necessary</Text>
            <Text medium>We use the following strictly necessary cookies:</Text>
            <div>
               <div className={styles.vocabItem}>
                  <Text bold medium>Functionality</Text>
                  <Text medium>We use this session cookie to remember you,
                     maintain your session whilst you are using our
                     website, and display the website in a correct
                     fashion.</Text>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PolicyView