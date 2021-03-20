<?php


namespace App\Service;


use App\Entity\ChatMessage;

class ChatMessageService
{
    public function chatMessageEntityToArray(ChatMessage $chatMessage): array
    {
        return [
            'id' => $chatMessage->getId(),
            'username' => $chatMessage->getUser()->getName(),
            'message' => $chatMessage->getMessage(),
            'date' => $chatMessage->getCreatedAt()->format('Y-m-d H:i:s')
        ];
    }
}
