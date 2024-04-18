import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
        signOut, authState, updateProfile, updateEmail,
        sendEmailVerification,
      reauthenticateWithCredential, 
      EmailAuthProvider, verifyBeforeUpdateEmail,
      updatePassword, sendPasswordResetEmail,
      deleteUser,
      signInWithRedirect,
      GoogleAuthProvider
    } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  auth: Auth = inject(Auth);
  authState = authState(this.auth)

  constructor() { 
    // this.logout();
    this.auth.languageCode = 'es';    
  }

  async createUser(email: string, password: string) {
    const user = await createUserWithEmailAndPassword(this.auth, email, password);
    await this.sendEmailVerification();
    return user;
  }

  getCurrentUser() {
      return this.auth.currentUser
  }

  updateProfile(data: {displayName?: string, photoURL?: string}) {
     return updateProfile(this.auth.currentUser, data)
  }

  updateEmail(email: string) {
    return updateEmail(this.auth.currentUser, email)
  }

  verifyBeforeUpdateEmail(email: string) {
    return verifyBeforeUpdateEmail(this.auth.currentUser, email)
  }

  reauthenticateWithCredential(password: string) {
    // const credential = EmailAuthProvider.credential(
    //   this.auth.currentUser.email,
    //   password
    // );
    const credential = GoogleAuthProvider.credential(null, password);
    return reauthenticateWithCredential(this.auth.currentUser, credential)
  }

  sendEmailVerification() {
    return sendEmailVerification(this.auth.currentUser)
  }

  updatePassword(newPasword: string) {
    return updatePassword(this.auth.currentUser, newPasword)
  }


  sendPasswordResetEmail(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  deleteUser() {
    return deleteUser(this.auth.currentUser);
  }

  loginWithProvider(providerId: string) {
     let provider;
     if (providerId == 'google') {
        provider = new GoogleAuthProvider();
     }
     signInWithRedirect(this.auth, provider)
  }

}
