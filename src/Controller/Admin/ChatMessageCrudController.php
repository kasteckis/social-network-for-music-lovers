<?php

namespace App\Controller\Admin;

use App\Entity\ChatMessage;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class ChatMessageCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return ChatMessage::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
