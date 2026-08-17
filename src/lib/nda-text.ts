export function ndaTemplate(customerName: string, quoteId: string) {
  return `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of the date last signed below by and between 3DBuildBot Industries, Inc., a Delaware corporation ("3DBuildBot"), and ${customerName || "the customer named at signature"} ("Customer"), collectively referred to as the "Parties," in connection with Quote reference ${quoteId}.

1. PURPOSE. The Parties intend to explore a manufacturing engagement in which each Party may disclose Confidential Information to the other.

2. CONFIDENTIAL INFORMATION. "Confidential Information" means any information disclosed by one Party to the other that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure, including CAD files, drawings, specifications, pricing, and business plans.

3. USE. Each Party will use Confidential Information solely to evaluate and pursue the potential engagement and will not disclose Confidential Information to any third party without prior written consent, except to employees and contractors bound by written obligations of confidentiality no less protective than this Agreement.

4. EXCLUSIONS. Confidential Information does not include information that (a) is or becomes publicly known through no wrongful act of the receiving Party; (b) is rightfully received from a third party without a duty of confidentiality; (c) is independently developed without use of the disclosing Party's Confidential Information; or (d) is required to be disclosed by law, provided the receiving Party gives the disclosing Party prompt written notice.

5. TERM. This Agreement is effective on the date of last signature and continues for three (3) years thereafter. Obligations of confidentiality survive for five (5) years from the date of disclosure.

6. NO LICENSE. Nothing in this Agreement grants either Party any right or license to Confidential Information except as expressly stated.

7. RETURN. Upon written request, each Party shall promptly return or destroy the other Party's Confidential Information.

8. NO OBLIGATION. This Agreement does not obligate either Party to enter into a further business relationship.

9. GOVERNING LAW. This Agreement is governed by the laws of the State of California, USA, without regard to conflict-of-law principles.

By signing below, each signatory represents that they have authority to bind the Party they represent.

3DBuildBot Industries, Inc.
Signature: /s/ 3DBuildBot QA
Date: ${new Date().toISOString().slice(0, 10)}

${customerName || "Customer"}
Signature: (electronic — see signature block on execution)
`;
}
