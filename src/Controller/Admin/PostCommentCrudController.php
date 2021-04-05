<?php

namespace App\Controller\Admin;

use App\Entity\PostComment;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class PostCommentCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return PostComment::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('text'),
            DateTimeField::new('createdAt'),
            AssociationField::new('user'),
            AssociationField::new('post'),
        ];
    }
}
