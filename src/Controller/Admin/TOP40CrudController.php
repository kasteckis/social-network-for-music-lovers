<?php

namespace App\Controller\Admin;

use App\Entity\TOP40;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;

class TOP40CrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return TOP40::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            BooleanField::new('new'),
            IntegerField::new('weeksInTop'),
            AssociationField::new('song')
        ];
    }
}
