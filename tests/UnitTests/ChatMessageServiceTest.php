<?php


namespace UnitTests;


use App\Entity\ChatMessage;
use App\Entity\User;
use App\Service\ChatMessageService;
use Doctrine\ORM\EntityManager;
use PHPUnit\Framework\TestCase;

class ChatMessageServiceTest extends TestCase
{
    private ChatMessageService $chatMessageService;

    protected function setUp(): void
    {
        $entityManager = $this->createMock(EntityManager::class);

        $this->chatMessageService = new ChatMessageService($entityManager);
        parent::setUp();
    }

    public function testChatMessageEntityToArray(): void
    {
        $user = new User();
        $user->setName('username');

        $chatMessage = new ChatMessage();
        $chatMessage
            ->setMessage('message')
            ->setUser($user)
        ;

        $chatMessageArray = $this->chatMessageService->chatMessageEntityToArray($chatMessage);

        $this->assertEquals('username', $chatMessageArray['username']);
        $this->assertEquals('message', $chatMessageArray['message']);
    }
}
