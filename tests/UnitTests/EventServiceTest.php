<?php


namespace UnitTests;


use App\Entity\Event;
use App\Service\EventService;
use Doctrine\ORM\EntityManager;
use PHPUnit\Framework\TestCase;

class EventServiceTest extends TestCase
{
    private EventService $eventService;

    protected function setUp(): void
    {
        $entityManager = $this->createMock(EntityManager::class);

        $this->eventService = new EventService($entityManager);
        parent::setUp();
    }

    public function testConvertEventArrayToJsonArray(): void
    {
        $event1 = new Event();
        $event1
            ->setText('text1')
            ->setTitle('title1')
            ->setStartDateTime(new \DateTime())
        ;

        $event2 = new Event();
        $event2
            ->setText('text2')
            ->setTitle('title2')
            ->setStartDateTime(new \DateTime())
        ;

        $eventEntityArray = [$event1, $event2];

        $eventArray = $this->eventService->convertEventArrayToJsonArray($eventEntityArray);

        $this->assertEquals('text1', $eventArray[0]['text']);
        $this->assertEquals('title1', $eventArray[0]['title']);

        $this->assertEquals('text2', $eventArray[1]['text']);
        $this->assertEquals('title2', $eventArray[1]['title']);
    }
}
