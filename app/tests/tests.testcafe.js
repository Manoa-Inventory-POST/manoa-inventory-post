import { Selector, t } from 'testcafe';
import { /* addStuffPage, listStuffAdminPage, listStuffPage, editStuffPage, */ /* manageDatabasePage, */ signOutPage } from './simple.page';
import { signInPage } from './signin.page';
import { signUpPage } from './signup.page';
import { navBar } from './navbar.component';
import { studentProfilePage } from './studentprofile.page';
import { landingPage } from './landing.page';
import { studenthomePage } from './studenthome.page';
import { facultyhomePage } from './facultyhome.page';
import { adminhomePage } from './adminhome.page';
import { facultySearchPage } from './facultysearch.page';
import { fullFacultyInfoPage } from './fullfacultyinfo.page';
import { clubSearchPage } from './clubsearch.page';
import { studentSearchPage } from './studentsearch.page';
// import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const studentCredentials = { username: 'student@foo.com', password: 'changeme' };
const facultyCredentials = { username: 'faculty@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const newCredentials = { username: 'jane@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(studentCredentials.username, studentCredentials.password);
  await navBar.isLoggedIn(studentCredentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

/** test('Test that user pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoAddStuffPage();
  await addStuffPage.isDisplayed();
  await navBar.gotoListStuffPage();
  await listStuffPage.isDisplayed();
  // want to see if we can get to the editStuffPage
  const editLinks = await Selector(`.${COMPONENT_IDS.LIST_STUFF_EDIT}`);
  await t.click(editLinks.nth(0));
  await editStuffPage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();
});
*/
test('Test that sign up and sign out work', async () => {
  await navBar.gotoSignUpPage();
  await signUpPage.isDisplayed();
  await signUpPage.signupUser(newCredentials.username, newCredentials.password);
  await navBar.isLoggedIn(newCredentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});
/*
test('Test that admin pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  // await navBar.gotoAddStuffPage();
  // await addStuffPage.isDisplayed();
  // await navBar.gotoListStuffPage();
  // await listStuffPage.isDisplayed();
  // want to see if we can get to the editStuffPage
  // const editLinks = await Selector(`.${COMPONENT_IDS.LIST_STUFF_EDIT}`);
  // await t.click(editLinks.nth(0));
  // await editStuffPage.isDisplayed();
  // await navBar.gotoListStuffAdminPage();
  // await listStuffAdminPage.isDisplayed();
  // await navBar.gotoManageDatabasePage();
  // await manageDatabasePage.isDisplayed();
});
*/
test('Test that student home and profile pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(studentCredentials.username, studentCredentials.password);
  await navBar.isLoggedIn(studentCredentials.username);
  await studenthomePage.isDisplayed();
  await navBar.gotoStudentProfilePage();
  await studentProfilePage.isDisplayed();
});

test('Test that faculty search and faculty info pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(studentCredentials.username, studentCredentials.password);
  await navBar.isLoggedIn(studentCredentials.username);
  await studenthomePage.isDisplayed();
  await navBar.gotoFacultySearchPage();
  await facultySearchPage.isDisplayed();
  const KBaek = Selector('a').withText('Kyungim Baek');
  await t.click(KBaek);
  await fullFacultyInfoPage.isDisplayed();
});

test('Test that faculty home page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(facultyCredentials.username, facultyCredentials.password);
  await navBar.isLoggedIn(facultyCredentials.username);
  await facultyhomePage.isDisplayed();
});

test('Test that the club search page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(studentCredentials.username, studentCredentials.password);
  await navBar.isLoggedIn(studentCredentials.username);
  await studenthomePage.isDisplayed();
  await navBar.gotoClubSearchPage();
  await clubSearchPage.isDisplayed();
});

test('Test that the student search page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(facultyCredentials.username, facultyCredentials.password);
  await navBar.isLoggedIn(facultyCredentials.username);
  await facultyhomePage.isDisplayed();
  await navBar.gotoStudentSearchPage();
  await studentSearchPage.isDisplayed();
});

test('Test that admin home page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await adminhomePage.isDisplayed();
});
