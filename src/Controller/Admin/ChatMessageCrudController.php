<?php

namespace App\Controller\Admin;

use App\Entity\ChatMessage;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ChatMessageCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return ChatMessage::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            DateTimeField::new('createdAt'),
            TextField::new('message'),
            AssociationField::new('user')
        ];
    }
}
