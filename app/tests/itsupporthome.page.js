import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class ITSupportHomePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ITSUPPORT_HOME}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const itsupporthomePage = new ITSupportHomePage();
