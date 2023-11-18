import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { User, Address } from './models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  //user
  users: User[] = [];
  newUser: User = { id: null, name: '', email: '', addresses: [] };
  updatedUser: User = {
    id: null,
    name: '',
    email: '',
    addresses: [{ street: '', city: '', country: '' }],
  };

  //address
  addresses: Address[] = [];
  newAddress: Address = {
    userId: null,
    id: null,
    street: '',
    city: '',
    country: '',
  };
  updatedAddress: Address = {
    userId: null,
    id: null,
    street: '',
    city: '',
    country: '',
  };

  searchText: string = '';
  filteredUsers: any;
  selectedUser: User | null = null;
  selectedAddress: Address | undefined;

  showEditForm: boolean = false;
  showEditAddressForm: boolean = false;
  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.loadUsers();
    this.loadAddresses();
  }

  showAddUserModal = false;
  showAddAddressModal = false;

  openAddUserModal() {
    this.showAddUserModal = true;
  }
  openAddAddressModal() {
    this.showAddAddressModal = true;
  }

  closeAddUserModal() {
    this.showAddUserModal = false;
    this.resetForm();
  }
  closeAddAddressModal() {
    this.showAddAddressModal = false;
    this.resetForm();
  }

  resetForm() {
    this.newUser = { id: null, name: '', email: '', addresses: [] };
    this.newAddress = {
      userId: null,
      id: null,
      street: '',
      city: '',
      country: '',
    };
  }

  onSearchUser() {
    if (this.searchText) {
      this.filteredUsers = this.users.filter((i) => {
        return i.name.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.filteredUsers = [];
    }
  }

  clearSearch() {
    this.searchText = '';
    this.onSearchUser();
  }

  loadUsers() {
    this.appService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
    this.filteredUsers = [...this.users];
  }

  onSubmitUser(form: NgForm) {
    if (form.valid) {
      this.appService.addUser(this.newUser).subscribe((addedUser: User) => {
        this.users.push(this.newUser as User);
        this.loadUsers();
        this.newUser = { id: null, name: '', email: '', addresses: [] };
        form.resetForm();
        this.closeAddUserModal();
      });
    } else {
      alert('Please fill all fields');
    }
  }

  openEditForm(user: User): void {
    this.updatedUser = { ...user };
    this.showEditForm = true;
  }

  cancelEdit(): void {
    this.showEditForm = false;
    this.updatedUser = {
      id: null,
      name: '',
      email: '',
      addresses: [{ street: '', city: '', country: '' }],
    };
  }

  updateUser(updatedUser: User): void {
    const userIdToUpdate = updatedUser.id;
    this.appService
      .updateUser(userIdToUpdate, updatedUser)
      .subscribe((response) => {
        console.log({ response });
        const index = this.users.findIndex((u) => u.id === userIdToUpdate);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...updatedUser };
        }
        this.loadUsers();
        this.loadAddresses();
        this.showEditForm = false;
        this.updatedUser = {
          id: null,
          name: '',
          email: '',
          addresses: [{ street: '', city: '', country: '' }],
        };
      });
  }

  deleteUser(userId: number): void {
    if (userId !== undefined && userId !== null) {
      const confirmed = confirm(`Are you sure to remove ${userId}`);
      if (confirmed) {
        this.appService.deleteUser(userId).subscribe(() => {
          this.users = this.users.filter((user) => user.id !== userId);
          this.loadUsers();
          this.loadAddresses();
          this.showDeletionAlert();
        });
      }
    } else {
      console.error('User ID is undefined or null');
    }
  }

  showDeletionAlert(): void {
    alert('User has been successfully deleted!');
  }

  //Address

  loadAddresses(): void {
    this.appService.getAddresses().subscribe((addresses) => {
      this.addresses = addresses;
    });
  }

  onSubmitAddress(form: NgForm) {
    if (form.valid) {
      this.appService
        .addAddress(this.newAddress)
        .subscribe((addAddress: Address) => {
          this.loadAddresses();
          this.loadUsers();
          this.newAddress = {
            userId: null,
            id: null,
            street: '',
            city: '',
            country: '',
          };
          form.resetForm();
          this.closeAddAddressModal();
        });
    } else {
      alert('Please fill all fields');
    }
  }

  openEditAddressForm(address: Address): void {
    this.updatedAddress = { ...address };
    this.showEditAddressForm = true;
  }

  cancelEditAddress(): void {
    this.showEditAddressForm = false;
    this.updatedAddress = {
      id: null,
      userId: null,
      street: '',
      city: '',
      country: '',
    };
  }

  updateAddress(address: Address): void {
    const addressIdToUpdate = address.id;
    this.appService
      .updateAddress(addressIdToUpdate, address)
      .subscribe((response) => {
        const index = this.addresses.findIndex(
          (u) => u.id === addressIdToUpdate
        );
        if (index !== -1) {
          this.addresses[index] = { ...this.addresses[index], ...address };
        }
        this.loadAddresses();
        this.loadUsers();
        this.showEditAddressForm = false;
        this.updatedAddress = {
          id: null,
          userId: null,
          street: '',
          city: '',
          country: '',
        };
      });
  }

  deleteAddress(addressId: number): void {
    if (addressId !== undefined && addressId !== null) {
      const confirmed = confirm(`Are you sure to remove ${addressId}`);
      if (confirmed) {
        this.appService.deleteAddress(addressId).subscribe(() => {
          this.addresses = this.addresses.filter(
            (address) => address.id !== addressId
          );
          this.loadAddresses();
          this.loadUsers();
          this.showDeletionAlert();
        });
      }
    } else {
      console.error('Address ID is undefined or null');
    }
  }

  showAddressDeletionAlert(): void {
    alert('Address has been successfully deleted!');
  }
}
