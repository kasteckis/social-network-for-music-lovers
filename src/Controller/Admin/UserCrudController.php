<?php

namespace App\Controller\Admin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            ImageField::new('profilePicture')
                ->setBasePath('images/profile')
                ->setUploadDir('public/images/profile'),
            EmailField::new('email'),
            TextField::new('name'),
            ChoiceField::new('roles')
                ->setChoices([
                    'Admin' => 'ROLE_ADMIN',
                    'User' => 'ROLE_USER',
                    'Mod' => 'ROLE_MOD'
                ])
                ->allowMultipleChoices(),
            TextField::new('password'),
            TextField::new('registrationIp'),
            TextField::new('ip'),
            BooleanField::new('active'),
            DateTimeField::new('createdAt'),
            DateTimeField::new('lastLogin'),
            TextField::new('bio'),
        ];
    }
}
