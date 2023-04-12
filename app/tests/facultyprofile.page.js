import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';
import { navBar } from './navbar.component';

class FacultyProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.PROFILE_UPDATE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    // From https://testcafe.io/documentation/402803/recipes/best-practices/create-helpers
    // Note that this file imports t (the test controller) from the testcafe module. You don’t need to pass t to helper functions because TestCafe can resolve the current test context and provide the correct test controller instance.
    await t.expect(this.pageSelector.exists).ok();
  }

  async updateProfile(phone) {
    await this.isDisplayed();
    await t.typeText(`#${COMPONENT_IDS.PROFILE_FORM_PHONE}`, phone, { replace: true });
    await t.click(`#${COMPONENT_IDS.PROFILE_FORM_SAVE} input.btn.btn-primary`);
    await t.click(Selector('.swal-button--confirm'));
    await navBar.gotoFacultyProfilePage();
    await this.isDisplayed();
    const updatedPhone = Selector(`#${COMPONENT_IDS.PROFILE_FORM_PHONE}`).value;
    await t.expect(updatedPhone).eql(phone);
  }
}

export const facultyProfilePage = new FacultyProfilePage();
