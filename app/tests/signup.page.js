import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class SignUpPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SIGN_UP}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(username, password, question1, answer1, question2, answer2) {
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME}`, 'Jane');
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME}`, 'Doe');
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_EMAIL}`, username);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}`, password);

    // Add security question 1
    await t
      .click(`#${COMPONENT_IDS.SIGN_UP_FORM_SECURITY_QUESTION_1}`)
      .click(Selector(`#${COMPONENT_IDS.SIGN_UP_FORM_SECURITY_QUESTION_1}`).find('option').withText(question1));
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_SECURITY_ANSWER_1}`, answer1);

    // Add security question 2
    await t
      .click(`#${COMPONENT_IDS.SIGN_UP_FORM_SECURITY_QUESTION_2}`)
      .click(Selector(`#${COMPONENT_IDS.SIGN_UP_FORM_SECURITY_QUESTION_2}`).find('option').withText(question2));
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_SECURITY_ANSWER_2}`, answer2);

    await t.click(`#${COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} input.btn.btn-primary`);
  }
}

export const signUpPage = new SignUpPage();
