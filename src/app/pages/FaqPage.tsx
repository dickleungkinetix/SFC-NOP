import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import imgHero from "../../assets/4095f7088a770ad2fc6a4abd1dbaf4eb80413283.png";

const faqItems = [
  {
    q: "What does code \"U\" mean?",
    a: "In SFC Database, \"U\" in the Officers, Advisers or Ownership tables means the person no longer holds that position but we do not know when the person ceased to hold the position.",
  },
  {
    q: "What does code \"From\" and \"Until\" dates mean?",
    a: "For positions, we use the right-open interval convention for time periods, which means that the period includes the \"from\" date but excludes the \"until\" date. The until date is the first date on which the person no longer holds a position. The reason we use this convention is that it makes it easier to see when a person has changed a position: until data is the date when they have changed positions or when the position is ended. It also makes it easier to see when a person has changed position in an organisation, as the two dates will make it easier to see when a person has changed position. For directorships, the \"until\" date is the first date on which the person no longer holds the position in that organisation.",
  },
  {
    q: "What is total return and CAGR?",
    a: "The total return on the ordinary shares of the company over the period in which the person holds or held the position, or since 3-Jan-1994 if the directorship began earlier. For more information on the calculation, see the notes on SFC Investor League Tables and the notes on sfc total returns. The Compound Annualised Growth Rate (CAGR) is the annualised rate of return.",
  },
  {
    q: "Are the data guaranteed to be accurate?",
    a: "No, but we try our best. Unfortunately, when published sources name individuals, they do not always identify them. To identify them would be to provide enough information to be 100% certain of the exact person to whom the name refers. It is very rare for sources to publish a unique identifier, such as an ID card number, which would allow us to be certain (assuming that an index of ID cards was available for verification). All we can do is make all reasonable efforts to avoid the two main types of errors: multiple identity, where the same person has more than one identifier in our database; and mistaken identity, where the identifier in our database refers to more than one person. Multiple identity usually arises because the person has used variations of his or her name in different instances - for example, using a married name rather than a maiden name. Misatken identity usually arises where two sources use the same name and in such similar contexts that we have assumed them to be the same person. We attempt to distinguish between them by reference to age, gender and any other biographical information we can find. That is why, if you search for common names in our database, you will sometimes find a year number such as (1965) in the name, which is the estimated year of birth (based on a published age), of the person. where the same person has unique name and year number, we may have a chance to distinguish between similar names. As a result, each name used is unique within the database, and each person has a unique ID. Secondly, there may be data which was accurate when entered, but has become inaccurate as a result of subsequent events or the passage of time. If our information is outdated, please tell us and provide updated information.",
  },
  {
    q: "Are the data up to date?",
    a: "We aim to keep track of changes in directorships of HK-listed companies, District Councils, Legislative Council, Executive Council and statutory and advisory bodies as announced by the HK Government via press releases or in the Gazette. These updates are usually done within a few days of announcement if not sooner. Many of the other positions have been entered based on a one-off disclosure or review. If you spot outdated information, please help us by sending us a link to the new information. We check the SFC register of licensed persons regularly. We check the Companies Registry regularly for changes in the name and status of companies incorporated or registered in HK, but we have no way to know when a person has changed his or her address without a pay-wall.",
  },
  {
    q: "Are the data complete?",
    a: "Coverage in sfc database varies depending on the subject. We cover the directors and advisers (auditors, bankers, lawyers and so on) of all HK-listed companies since 1-Jan-1990, including deleted ones. Let us know if you spot errors. For companies not listed in HK, directorship data is not maintained but account separately as we go through HK disclosures, so you will not see the entire board or most non-HK-listed companies. We cover members of statutory and advisory bodies, since the Gazette went online in May-2000. For some of those bodies, we have been able to glean information from online Government press releases since 1-Jul-1997. We cover the District Councils since they took over the District Boards in 1999. We cover the Election Committee for Hong Kong's Chief Executive since it was established in 1996. We include data on all SFC-licensed entities and their past and present responsible officers and representatives since 1-Apr-2023. We include data on all companies registered at the Companies Registry since recording registration was not compulsory until 1911.",
  },
  {
    q: "How do I report an error or outdated information?",
    a: "We welcome reports of errors for correction. Just click here to fill in the form, and please provide as much information as possible, including links to any source material.",
  },
  {
    q: "I'm an important person in HK. Why am I not in sfc Database?",
    a: "We're sorry we missed you! Please write and tell us why you think you should be included in the database. We reserve sole discretion to include or exclude you. There is no charge for inclusion. We also preserve the right to include or do not include an updated or untrue or or provide informtion in the database from publicly available sources.",
  },
  {
    q: "We are an important organisation in HK. Can you add us to sfc Database?",
    a: "Yes. Just send us complete information on the full names and, preferably, to reduce mistaken identity, the year of birth of the members of your governing body (e.g. board of directors or council), and please keep us updated! We reserve the sole discretion to include or exclude your organisation. There is no charge for inclusion. All information must be verifiable from publicly available sources.",
  },
  {
    q: "We are a company registered in HK. Can you remove us from sfc Database?",
    a: "No. We maintain a complete database of every company ever incorporated or registered in HK, including its date of incorporation (or for non-HK companies, the date of registration in HK), past and present names, type and status, as recorded in the HK Companies Registry. These data are public information, and when you incorporate or register a company in HK, with the privilege of limited liability, you are not entitled to keep the company secret.",
  },
  {
    q: "Does sfc Database breach privacy laws?",
    a: "Of course not! All of the data in sfc Database are previously-published information from public sources, including but not limited to listed company annual reports, government and company announcements, judgments, gazettes, published birth announcements, obituaries, statutory disclosures and information reported or appearing in newspapers and other journals. All that we do is bring it all together in one easily-accessible database. For more on ID numbers, which are just a more accurate version of your name, click here.",
  },
  {
    q: "Will you delete published information?",
    a: "Article 27 of the Basic Law, Hong Kong's constitution, protects freedom of speech, of the press and of publication. It is a key element of the rule of law, and one of Hong Kong's greatest assets. The First Amendment to the United States Constitution also protects such freedoms. You are reading this from our server in the United States. Our policy is that if information has been legally published and we have included it in sfc Database, then we will not delete it, because that would leave some members of the public (including us) with legally-obtained information that others do not have, unless they can find it in other sources. The relevance of information to different readers may decay over time, but it is not for us to determine the relevance of information to you. So for example we don't delete old directorship records or shareholding records. This policy applies even if the source subsequently reacts its own archives. It is simply impractical to try to reverse the arrow of time and withdraw published information into an \"unpublished\" state, where it can every repository or data page, deleting and formatting everything. We will not create Orwellian memory holes. It is true that the internet has made published information more accessible than ever before. That is not a reason to censor it. However, if information has been illegally published (for example, an illegally-uploaded bank file in a security breach), then unless there is an outweighting public interest, we would not include it in our database or report it in the first place. Examples of an outweighting public interest include, but are not limited to, situations in which the information exposes wrong-doing or conflicts of interest. Examples might include a corruption payment, or a hidden related-party interest in a corporate transaction.",
  },
  {
    q: "Where is sfc Database published?",
    a: "[Content not provided]",
  },
  {
    q: "What are sfc Governance Ratings and sfc Trust Ratings?",
    a: "sfc Governance Ratings represent the average of the latest rating contributed by logged-in sfc users over the last year and not withdrawn. If the user does not update the rating within 1 year, then it will no longer be counted in the average. A user can change or withdraw her rating for any organisation at any time, thereby affecting the average over time. Ratings are intended to be absolute, not relative to any peer group, and not related to any market valuation of listed securities. Zero is the worst, 5 is the Best. A user can rate any organisation, including statutory bodies and private companies. sfc Trust Ratings use the same methodology but relate to people, and how well users trust this person, again on an absolute scale from 0 to 5. A person may of course be very trusted but not necessarily have any skill as an officer of a particular organisation. The rating is intended as a measure of trust, not competence, although if an incompetent person occupies a position of trust then this may to some extent be reflect in user opinions. All Governance and Trust ratings are average user opinions and not facts, and do not necessarily represent the opinions of sfc.com. No contributing users will be identified. Remember that we have no control over our users, and small samples of opinions may not be meaningful.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="relative">
          <img
            src={imgHero}
            alt=""
            className="absolute inset-x-0 top-0 w-full h-[444px] object-cover object-center opacity-80"
          />
          <div className="absolute inset-x-0 top-0 h-[444px] bg-gradient-to-b from-blue-800/30 to-gray-800/30" />

          <section className="relative max-w-9xl mx-auto w-full px-2 sm:px-4 lg:px-6 py-4 lg:py-6">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            <div className="mb-3">
              <span
                className="text-xs font-semibold px-3 py-1 rounded border"
                style={{
                  background: "rgb(232, 245, 233)",
                  color: "rgb(46, 125, 50)",
                  border: "1px solid rgb(165, 214, 167)",
                }}
              >
                FAQ
              </span>
            </div>

            <h1
              className="text-gray-900 mb-1"
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "clamp(16px, 3vw, 22px)",
                fontWeight: "bold",
              }}
            >
              Frequently asked questions on SFC Database
            </h1>

            <p className="text-sm text-gray-600 leading-relaxed">
              Note: for FAQ on SFC Reports, click here.
            </p>

            <div className="max-w-6xl mx-auto w-full py-3 lg:py-5">
              <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12">
                <div className="flex-1 min-w-0">
                  <div className="border-b border-gray-200">
                    {faqItems.map((item, idx) => {
                      const isOpen = openIndex === idx;
                      return (
                        <div
                          key={item.q}
                          className="border-b border-gray-200"
                        >
                          <button
                            className="w-full text-left py-4 flex items-start justify-between gap-3"
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                          >
                            <span
                              className={
                                openIndex === idx
                                  ? "text-sm lg:text-sm leading-snug font-bold text-[#008581]"
                                  : "text-sm lg:text-sm leading-snug font-bold text-gray-700"
                              }
                            >
                              {idx + 1}. {item.q}
                            </span>
                            <div className="shrink-0 mt-0.5">
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                          </button>

                          {isOpen && (
                            <div className="px-0 pb-4 text-sm text-gray-600 leading-relaxed">
                              {item.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
