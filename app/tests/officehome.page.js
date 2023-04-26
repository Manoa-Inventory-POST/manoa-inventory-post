import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class OfficeHomePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.OFFICE_HOME}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const officehomePage = new OfficeHomePage();
