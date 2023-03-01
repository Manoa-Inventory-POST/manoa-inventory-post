import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class AdminHomePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ADMIN_HOME}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    // From https://testcafe.io/documentation/402803/recipes/best-practices/create-helpers
    // Note that this file imports t (the test controller) from the testcafe module. You don’t need to pass t to helper functions because TestCafe can resolve the current test context and provide the correct test controller instance.
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const adminhomePage = new AdminHomePage();
