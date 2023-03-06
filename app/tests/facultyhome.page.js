import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class FacultyHomePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.FACULTY_HOME}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const facultyhomePage = new FacultyHomePage();
