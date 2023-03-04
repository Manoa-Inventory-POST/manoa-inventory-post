import { Selector, t } from 'testcafe';
// import { navBar } from './navbar.component';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
// import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class FacultySearchPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.FACULTY_SEARCH}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const facultySearchPage = new FacultySearchPage();
