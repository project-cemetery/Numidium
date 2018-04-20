<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180314082140 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE book (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, year SMALLINT NOT NULL, description LONGTEXT NOT NULL, paper TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE library (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE libs_books (library_id INT NOT NULL, book_id INT NOT NULL, INDEX IDX_E63EB1AAFE2541D7 (library_id), INDEX IDX_E63EB1AA16A2B381 (book_id), PRIMARY KEY(library_id, book_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE libs_articles (library_id INT NOT NULL, article_id INT NOT NULL, INDEX IDX_4C14027AFE2541D7 (library_id), INDEX IDX_4C14027A7294869C (article_id), PRIMARY KEY(library_id, article_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE article (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, year SMALLINT NOT NULL, description LONGTEXT NOT NULL, link VARCHAR(511) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE libs_books ADD CONSTRAINT FK_E63EB1AAFE2541D7 FOREIGN KEY (library_id) REFERENCES library (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE libs_books ADD CONSTRAINT FK_E63EB1AA16A2B381 FOREIGN KEY (book_id) REFERENCES book (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE libs_articles ADD CONSTRAINT FK_4C14027AFE2541D7 FOREIGN KEY (library_id) REFERENCES library (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE libs_articles ADD CONSTRAINT FK_4C14027A7294869C FOREIGN KEY (article_id) REFERENCES article (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE libs_books DROP FOREIGN KEY FK_E63EB1AA16A2B381');
        $this->addSql('ALTER TABLE libs_books DROP FOREIGN KEY FK_E63EB1AAFE2541D7');
        $this->addSql('ALTER TABLE libs_articles DROP FOREIGN KEY FK_4C14027AFE2541D7');
        $this->addSql('ALTER TABLE libs_articles DROP FOREIGN KEY FK_4C14027A7294869C');
        $this->addSql('DROP TABLE book');
        $this->addSql('DROP TABLE library');
        $this->addSql('DROP TABLE libs_books');
        $this->addSql('DROP TABLE libs_articles');
        $this->addSql('DROP TABLE article');
    }
}
